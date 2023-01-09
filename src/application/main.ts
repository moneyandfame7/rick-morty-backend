// import { DataBaseInstance } from '../database/database.js';
// import { characterRouter } from './routers/character-router.js';
// import { episodeRouter } from './routers/episode-router.js';
// import { mainRouter } from './routers/main-router.js';
// import { homeRouter } from './routers/home-router.js';
// import express from 'express';
// import cors from 'cors';
// import fileUpload from 'express-fileupload';
// import ApiServerConfig from '../config/api-config.js';
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';
//
// const app = express();
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(cors());
// app.use(fileUpload({}));
//
// app.use('/api', characterRouter);
// app.use('/api', episodeRouter);
// app.use('/api', mainRouter);
// app.use('/', homeRouter);
//
// // check dependency injection
// (async (): Promise<void> => {
//   await DataBaseInstance.connect();
//   app.listen(ApiServerConfig.PORT, ApiServerConfig.HOST);
//   console.log(`>> Server started >> http://${ApiServerConfig.HOST}:${ApiServerConfig.PORT}/api`);
// })();

import ServerApplication from './server-application.js';
import { DataBaseInstance } from '../database/database.js';

async function runApplication() {
  await DataBaseInstance.connect();
  ServerApplication.run();
}

(async (): Promise<void> => {
  await runApplication();

  console.log('Server started and DB connection established');
})();
