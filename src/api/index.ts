import express, { ErrorRequestHandler, Express, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import fileUpload from 'express-fileupload';
import router from './routers/main-router.js';
import characterRouter from './routers/character-router.js';
import episodeRouter from './routers/episode-router.js';
import locationRouter from './routers/location-router.js';
import db from '../database/models/index.js';
import characterDbController from '../database/controllers/character-controller.js';
import episodeDbController from '../database/controllers/episode-controller.js';
import { characters, episodes } from '../temp-data/index.js';
import { fetchData } from '../utils/fetch-data.js';

const app: Express = express();
const port = process.env.PORT || 1337;

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

const run = async () => {
  const char1 = await characterDbController.create(characters[0]);
  const char2 = await characterDbController.create(characters[1]);
  const char3 = await characterDbController.create(characters[2]);
  const char4 = await characterDbController.create(characters[3]);

  const epis1 = await episodeDbController.create(episodes[0]);
  const epis2 = await episodeDbController.create(episodes[1]);

  await episodeDbController.addCharacter(epis1!.id, char1!.id);
  await episodeDbController.addCharacter(epis1!.id, char2!.id);
  await episodeDbController.addCharacter(epis1!.id, char3!.id);
  await episodeDbController.addCharacter(epis1!.id, char4!.id);

  await episodeDbController.addCharacter(epis2!.id, char1!.id);
  await episodeDbController.addCharacter(epis2!.id, char4!.id);

  // Show episodes
  const _epis1 = await episodeDbController.findById(epis1!.id);
  console.log('>> epis 1', JSON.stringify(_epis1, null, 2));

  const _episodes = await episodeDbController.findAll();
  console.log('>> episodes', JSON.stringify(_episodes, null, 2));

  // Show Characters
  const _char = await characterDbController.findById(char1!.id);
  console.log('>> char 1', JSON.stringify(_char, null, 2));

  const _characters = await characterDbController.findAll();
  console.log('>> characters', JSON.stringify(_characters, null, 2));
};

app.use('/_episodes', async (req: Request, res: Response) => {
  const _episodes = await episodeDbController.findAll();

  res.send(_episodes);
});
app.use('/_characters', async (req: Request, res: Response) => {
  const _characters = await characterDbController.findAll();

  res.send(_characters);
});
app.use('/test', async (req: Request, res: Response) => {
  const data = await fetchData('https://rickandmortyapi.com/api/episode');
  res.send(data);
});

db.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
  app.listen(port, () => {
    console.log(`Example app listening on port  ${port}`);
  });
  run();
});
