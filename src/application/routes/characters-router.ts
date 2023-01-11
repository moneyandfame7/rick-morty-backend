import express from 'express';
import CharacterController from '../controllers/character-controller.js';
import { catchError } from '../handlers/catch-error.js';

const charactersRouter = express.Router();

/* GET Characters */
charactersRouter.get('/characters', catchError(CharacterController.findAll));

charactersRouter.get('/characters/:id', catchError(CharacterController.findById));

charactersRouter.get('/characters/episodes', CharacterController.findByEpisode);

/* POST Character */
charactersRouter.post('/characters', catchError(CharacterController.create));

export default charactersRouter;
