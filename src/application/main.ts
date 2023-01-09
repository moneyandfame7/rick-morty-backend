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

// import { NextFunction, Request, Response } from 'express';

import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import episodes from './routes/episodes.js';
import characters from './routes/characters.js';
import index from './routes/index.js';
import users from './routes/users.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', users);
app.use('/api', episodes);
app.use('/api', characters);

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);

export default app;
