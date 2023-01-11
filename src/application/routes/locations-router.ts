import express from 'express';
import LocationController from '../controllers/location-controller.js';
import { catchError } from '../handlers/catch-error.js';
import EpisodeController from '../controllers/episode-controller.js';
import episodesRouter from './episodes-router.js';

const locationsRouter = express.Router();

/* GET Locations */
locationsRouter.get('/locations', LocationController.all);

locationsRouter.get('/locations/:id', catchError(LocationController.find));

episodesRouter.get('/locations/residents', catchError(LocationController.byCharacter));

/* POST Locations */
locationsRouter.post('/locations', catchError(LocationController.create));

export default locationsRouter;
