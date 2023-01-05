import express, { ErrorRequestHandler, Express } from 'express';
import cors from 'cors';
import 'dotenv/config';
import fileUpload from 'express-fileupload';
import router from './api/routers/index.js';
import characterRouter from './api/routers/character.router.js';
import episodeRouter from './api/routers/episode.router.js';
import locationRouter from './api/routers/location.router.js';
import db from './models/index.js';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use('/api', router);
app.use('/api', characterRouter);
app.use('/api', episodeRouter);
app.use('/api', locationRouter);

app.use(<ErrorRequestHandler>((err, req, res, next) => {
  return res.send({ message: err });
}));

db.sync().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port  ${port}`);
  });
});
