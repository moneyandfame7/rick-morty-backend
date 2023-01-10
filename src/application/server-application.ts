import ApiServerConfig from '../config/api-config.js';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import episodesRouter from './routes/episodes-router.js';
import charactersRouter from './routes/characters-router.js';
import { fileURLToPath } from 'url';
import mainRouter from './routes/main-router.js';
import errorHandler from './middlewares/error-handler.js';
import { getIdFromUrl } from '../utils/getId.js';
import { fetchData } from '../utils/fetch-data.js';
import { ICharacter, IEpisode } from '../types/response.js';
import { Episode as EpisodeType } from '../types/models/episode.js';
import Episode from '../database/models/episode.js';
import EpisodeService from './services/episode-service.js';
import Character from '../database/models/character.js';
import CharacterService from './services/character-service.js';
import { IEpisodeObj, tempCharacters, tempEpisodes } from './temp.js';

class ServerApplication {
  private readonly __filename = fileURLToPath(import.meta.url);

  private readonly __dirname = path.dirname(this.__filename);

  private readonly host: string = ApiServerConfig.HOST;

  private readonly port: number = ApiServerConfig.PORT;

  private readonly app: Express = express();

  protected setup() {
    this.app.set('view engine', 'pug');
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(this.__dirname, 'public')));

    // routers

    this.app.use('/api', mainRouter);
    this.app.use('/api', episodesRouter);
    this.app.use('/api', charactersRouter);

    this.app.use('/_episodes', async (req: Request, res: Response) => {
      const _episodes = await EpisodeService.findAll();

      res.send(_episodes);
    });
    this.app.use('/_characters', async (req: Request, res: Response) => {
      const _characters = await CharacterService.findAll();

      res.send(_characters);
    });
    // this.app.use('/test', async (req: Request, res: Response) => {
    //   interface IEpisodeObj {
    //     name: string;
    //     air_date: string;
    //     episode: string;
    //     created_at: Date;
    //     url: string;
    //   }
    //   interface ICharacterObj {
    //     name: string;
    //     created_at: Date;
    //     status: string;
    //     species: string;
    //     type: string;
    //     gender: string;
    //     image: string;
    //     url: string;
    //   }
    //   const episodesObj: IEpisodeObj[] = [];
    //   const characterObj: ICharacterObj[] = [];
    //   const responseEpisode = await fetchData<IEpisode>('https://rickandmortyapi.com/api/episode');
    //   responseEpisode.map((episode) => {
    //     episodesObj.push({
    //       // characters: episode.characters,
    //       // id: episode.id,
    //       name: episode.name,
    //       air_date: episode.air_date,
    //       episode: episode.episode,
    //       created_at: new Date(),
    //       url: episode.url,
    //     });
    //   });
    //   const _episodes = await Episode.bulkCreate(episodesObj);
    //
    //   const responseCharacter = await fetchData<ICharacter>('https://rickandmortyapi.com/api/character');
    //   responseCharacter.map((character) => {
    //     characterObj.push({
    //       name: character.name,
    //       gender: character.gender,
    //       status: character.status,
    //       image: character.image,
    //       species: character.species,
    //       type: character.type,
    //       created_at: new Date(),
    //       url: character.url,
    //     });
    //   });
    //   const _characters = await Character.bulkCreate(characterObj);
    //
    //   for (let i = 0; i < responseEpisode.length; i++) {
    //     for (let j = 0; j < responseEpisode[i].characters.length; j++) {
    //       const characterId = getIdFromUrl(responseEpisode[i].characters[j]);
    //       await EpisodeService.addCharacter(_episodes[i].id, characterId);
    //     }
    //   }
    //   const __episodes = await EpisodeService.findAll();
    //   const __characters = await CharacterService.findAll();
    //   res.send(__characters);
    //   // !!!!
    // });
    this.app.use((req, res) => {
      res.send({
        error: {
          message: 'There is nothing here.',
        },
      });
    });
    // error handler
    this.app.use(errorHandler);
  }

  private log() {
    console.log(`>> Server started >> http://${this.host}:${this.port}`);
  }

  public async run(): Promise<void> {
    this.setup();
    await this.app.listen(this.port, this.host);
    this.log();
  }
}

export default new ServerApplication();
