import EpisodeController from '../controllers/episode-controller.js';
import express from 'express';
import EpisodeService from '../services/episode-service.js';
import CharacterService from '../services/character-service.js';
//
const router = express.Router();

router.get('/episodes', EpisodeController.all);

router.get('/episodes/:id', EpisodeController.find);

router.get('/episodes', EpisodeController.create);

router.get('/byCharacter', EpisodeController.byCharacter);

export { router as episodeRouter };
