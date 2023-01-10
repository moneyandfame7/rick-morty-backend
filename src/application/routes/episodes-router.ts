import express from 'express';
import EpisodeController from '../controllers/episode-controller.js';
import { catchError } from '../handlers/catch-error.js';

const episodesRouter = express.Router();

/* GET Episodes */
episodesRouter.get('/episodes/member', EpisodeController.byCharacter);

episodesRouter.get('/episodes/:id', catchError(EpisodeController.find));

episodesRouter.get('/episodes', EpisodeController.all);

export default episodesRouter;
