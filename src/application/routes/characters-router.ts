import express from 'express';
import CharacterController from '../controllers/character-controller.js';
import { catchError } from '../handlers/catch-error.js';
import S3Bucket from '../../config/s3-config.js';

const charactersRouter = express.Router();

/* GET Characters */
charactersRouter.get('/characters', CharacterController.findAll);

charactersRouter.get('/characters/:id', catchError(CharacterController.findById));

charactersRouter.get('/characters/episodes', CharacterController.byEpisode);

/* POST Character */
charactersRouter.post('/create-character', S3Bucket.upload.single('image'), catchError(CharacterController.create));

export default charactersRouter;
