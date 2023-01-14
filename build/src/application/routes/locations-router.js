import express from 'express';
import LocationController from '../controllers/location-controller.js';
import { catchError } from '../handlers/catch-error.js';
import episodesRouter from './episodes-router.js';
const locationsRouter = express.Router();
/* GET Locations */
locationsRouter.get('/locations', LocationController.findAll);
locationsRouter.get('/locations/:id', catchError(LocationController.findById));
episodesRouter.get('/locations/residents', catchError(LocationController.findByCharacter));
/* POST Locations */
locationsRouter.post('/locations', catchError(LocationController.create));
export default locationsRouter;
