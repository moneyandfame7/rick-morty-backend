import express from 'express';
import EpisodeController from '../controllers/episode-controller.js';
import { catchError } from '../handlers/catch-error.js';

const episodesRouter = express.Router();

/* GET Episodes */
episodesRouter.get('/episodes', catchError(EpisodeController.findAll));

episodesRouter.get('/episodes/:id', catchError(EpisodeController.findById));

episodesRouter.get('/episodes/member', catchError(EpisodeController.findByCharacter));

export default episodesRouter;
