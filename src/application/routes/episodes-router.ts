import express from 'express';
import EpisodeController from '../controllers/episode-controller';
import { catchError } from '../handlers/catch-error';

const episodesRouter = express.Router({ mergeParams: true });

/* GET Episodes */

// пошук по айді має бути знизу, бо тоді не працює нічого
episodesRouter.get('/episodes', catchError(EpisodeController.findAll));

episodesRouter.get('/episodes/member', catchError(EpisodeController.findByCharacter));

episodesRouter.get('/episodes/:id', catchError(EpisodeController.findById));

export default episodesRouter;
