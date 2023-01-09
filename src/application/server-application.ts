import ApiServerConfig from '../config/api-config.js';
import express, { Express } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { mainRouter } from '../application/routers/main-router.js';
import { episodeRouter } from './routers/episode-router.js';
import { characterRouter } from './routers/character-router.js';
import Episode from '../database/models/episode.js';
import Character from '../database/models/character.js';
import { homeRouter } from './routers/home-router.js';
import CharacterController from './controllers/character-controller.js';
import EpisodeController from './controllers/episode-controller.js';

export default class ServerApplication {
  private readonly host: string = ApiServerConfig.HOST;

  private readonly port: number = ApiServerConfig.PORT;

  static readonly app: Express = express();

  protected setup() {
    ServerApplication.app.use(cors());
    ServerApplication.app.use(express.json());
    ServerApplication.app.use(fileUpload({}));

    ServerApplication.app.use('/api', characterRouter);

    ServerApplication.app.use('/api', episodeRouter);

    ServerApplication.app.use('/api', mainRouter);

    ServerApplication.app.use('/', homeRouter);

    ServerApplication.app.use('/test', async (req, res) => {
      const urls: any[] = [];

      interface IEpisode {
        id: number;
        name: string;
        created_at: string;
        characters: string[];
        air_date: string;
      }

      const episodes: any = await Episode.findAll({
        include: [
          {
            model: Character,
            as: 'characters',
            attributes: ['url'],

            // якщо убрати це, то можна побачити Episodeну таблицю
            through: {
              attributes: [],
            },
          },
        ],
        nest: true,
      })
        .then((episodes) => {
          return episodes[0];
        })
        .catch((err) => {
          console.log('>> Error while retrieving Episodes: ', err);
          throw new Error(err);
        });

      res.send(episodes[0].characters);
    });
  }

  private log() {
    console.log(`>> Server started >> http://${this.host}:${this.port}`);
  }

  public async run(): Promise<void> {
    this.setup();
    await ServerApplication.app.listen(this.port, this.host);
    this.log();
  }
}
