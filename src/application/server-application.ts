import ApiServerConfig from '../config/api-config.js';
import express, { Express } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { mainRouter } from '../application/routers/main-router.js';
import { episodeRouter } from './routers/episode-router.js';
import { characterRouter } from './routers/character-router.js';

export default class ServerApplication {
  private readonly host: string = ApiServerConfig.HOST;

  private readonly port: number = ApiServerConfig.PORT;

  static readonly app: Express = express();

  protected setup() {
    ServerApplication.app.use(cors());

    ServerApplication.app.use(express.json());

    ServerApplication.app.use(fileUpload({}));

    ServerApplication.app.use('/test', (req, res) => {
      res.send('test');
    });

    ServerApplication.app.use('/api', mainRouter);

    ServerApplication.app.use('/api', characterRouter);

    ServerApplication.app.use('/api', episodeRouter);
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
