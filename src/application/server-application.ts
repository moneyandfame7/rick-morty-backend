import ApiServerConfig from '../config/api-config.js';
import express, { Express } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import episodesRouter from './routes/episodes-router.js';
import charactersRouter from './routes/characters-router.js';
import { fileURLToPath } from 'url';
import mainRouter from './routes/main-router.js';
import errorHandler from './middlewares/error-handler.js';
import locationsRouter from './routes/locations-router.js';
import cors from 'cors';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import sharp from 'sharp';
import CharacterService from './services/character-service.js';
import { CreationAttributes } from 'sequelize';
import { Character } from '../types/models/character.js';
import S3Bucket from '../config/s3-config.js';

// TODO: зробити фільтрацію в локаціях так само як в персонажах
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
    this.app.use(cors());

    dotenv.config();

    // routers

    this.app.use('/api', mainRouter);
    this.app.use('/api', episodesRouter);
    this.app.use('/api', charactersRouter);
    this.app.use('/api', locationsRouter);

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
