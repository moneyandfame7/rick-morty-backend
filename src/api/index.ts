import express, { ErrorRequestHandler, Express, Request, response, Response } from 'express';
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
import { fetchData, makeConcurrentRequest } from '../utils/fetch-data.js';
import { CreationAttributes } from 'sequelize/types/index.js';
import { Episode as EpisodeType } from '../types/episode.js';
import { ICharacter, IEpisode } from '../types/response.js';
import Episode from '../database/models/episode.js';
import axios from 'axios';
import { getIdFromUrl } from '../utils/getId.js';
import Character from '../database/models/character.js';

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

// const run = async () => {
//   const char1 = await characterDbController.create(characters[0]);
//   const char2 = await characterDbController.create(characters[1]);
//   const char3 = await characterDbController.create(characters[2]);
//   const char4 = await characterDbController.create(characters[3]);
//
//   const epis1 = await episodeDbController.create(episodes[0]);
//   const epis2 = await episodeDbController.create(episodes[1]);
//
//   await episodeDbController.addCharacter(epis1!.id, char1!.id);
//   await episodeDbController.addCharacter(epis1!.id, char2!.id);
//   await episodeDbController.addCharacter(epis1!.id, char3!.id);
//   await episodeDbController.addCharacter(epis1!.id, char4!.id);
//
//   await episodeDbController.addCharacter(epis2!.id, char1!.id);
//   await episodeDbController.addCharacter(epis2!.id, char4!.id);
//
//   // Show episodes
//   const _epis1 = await episodeDbController.findById(epis1!.id);
//   console.log('>> epis 1', JSON.stringify(_epis1, null, 2));
//
//   const _episodes = await episodeDbController.findAll();
//   console.log('>> episodes', JSON.stringify(_episodes, null, 2));
//
//   // Show Characters
//   const _char = await characterDbController.findById(char1!.id);
//   console.log('>> char 1', JSON.stringify(_char, null, 2));
//
//   const _characters = await characterDbController.findAll();
//   console.log('>> characters', JSON.stringify(_characters, null, 2));
// };

app.use('/_episodes', async (req: Request, res: Response) => {
  const _episodes = await episodeDbController.findAll();

  res.send(_episodes);
});
app.use('/_characters', async (req: Request, res: Response) => {
  const _characters = await characterDbController.findAll();

  res.send(_characters);
});

app.use('/test', async (req: Request, res: Response) => {
  interface IEpisodeObj {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    created_at: Date;
    url: string;
  }

  interface ICharacterObj {
    id?: number;
    name: string;
    created_at: Date;
    url: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
  }

  const episodesObj: IEpisodeObj[] = [];
  const characterObj: ICharacterObj[] = [];
  const responseEpisode = await fetchData<IEpisode>('https://rickandmortyapi.com/api/episode');
  responseEpisode.map((episode) => {
    episodesObj.push({
      // characters: episode.characters,
      id: episode.id,
      name: episode.name,
      air_date: episode.air_date,
      episode: episode.episode,
      created_at: new Date(),
      url: `${process.env.BASE_URL}/episodes/${episode.id}`,
    });
  });
  const _episodes = await Episode.bulkCreate(episodesObj);

  const responseCharacter = await fetchData<ICharacter>('https://rickandmortyapi.com/api/character');
  responseCharacter.map((character) => {
    characterObj.push({
      name: character.name,
      gender: character.gender,
      status: character.status,
      url: `${process.env.BASE_URL}/episodes/${character.id}`,
      image: character.image,
      species: character.species,
      type: character.type,
      created_at: new Date(),
    });
  });
  const _characters = await Character.bulkCreate(characterObj);
  // !!!
  // res.send(_episodes);
  // for (let i = 0; i < _episodes.length; i++) {
  //   for (let j = 0; j < responseEpisode[i].characters.length; j++) {
  //     const response = await makeConcurrentRequest(responseEpisode[i].characters);
  //
  //     _episodes[i].addCharacters(response[j].id);
  //   }
  // }

  // !!!
  for (let i = 0; i < responseEpisode.length; i++) {
    for (let j = 0; j < responseEpisode[i].characters.length; j++) {
      const characterId = getIdFromUrl(responseEpisode[i].characters[j]);
      await episodeDbController.addCharacter(_episodes[i].id, characterId);
    }
  }
  const __episodes = await episodeDbController.findAll();
  res.send(__episodes);
  // !!!!
});

db.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
  app.listen(port, () => {
    console.log(`Example app listening on port  ${port}`);
  });

  // run();
});
