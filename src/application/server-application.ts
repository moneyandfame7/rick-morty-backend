import express, { Express } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import errorHandler from './middlewares/error-handler';
import ApiServerConfig from '../config/api-config';
import episodesRouter from './routes/episodes-router';
import charactersRouter from './routes/characters-router';
import mainRouter from './routes/main-router';
import locationsRouter from './routes/locations-router';
import cors from 'cors';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import sharp from 'sharp';
import CharacterService from './services/character-service';
import { CreationAttributes } from 'sequelize';
import { Character } from '../types/models/character';
import S3Bucket from '../config/s3-config';
dotenv.config();
class ServerApplication {
  private readonly host: string = ApiServerConfig.HOST;

  private readonly port: any = process.env.PORT || 3001;

  private readonly app: Express = express();

  protected setup() {
    this.app.set('view engine', 'pug');
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());

    /* routes */
    this.app.use('/api', mainRouter);
    this.app.use('/api', episodesRouter);
    this.app.use('/api', charactersRouter);
    this.app.use('/api', locationsRouter);

    /* middlewares */
    this.app.use((req, res) => {
      res.send({
        error: {
          message: 'There is nothing here.',
        },
      });
    });
    this.app.use(errorHandler);
  }

  private log() {
    console.log(`>> Server started >> http://${this.host}:${this.port}/api`);
  }

  public async run(): Promise<void> {
    this.setup();
    await this.app.listen(this.port, this.host);
    this.log();
  }
}

export default new ServerApplication();
