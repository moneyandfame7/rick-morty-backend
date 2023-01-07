import EpisodeController from '../controllers/episode-controller.js';
import express from 'express';
import EpisodeService from '../services/episode-service.js';
import CharacterService from '../services/character-service.js';
//
const router = express.Router();

router.get('/episodes', EpisodeController.all);

router.get('/episodes/:id', EpisodeController.find);

router.get('/episodes', EpisodeController.create);

router.get('/test', (req, res) => {
  const obj = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
      { url: 'https://rickandmortyapi.com/api/episode/1' },
      { url: 'https://rickandmortyapi.com/api/episode/1' },
      { url: 'https://rickandmortyapi.com/api/episode/1' },
      { url: 'https://rickandmortyapi.com/api/episode/1' },
      { url: 'https://rickandmortyapi.com/api/episode/1' },
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  };
  res.json(obj);
});

export { router as episodeRouter };
