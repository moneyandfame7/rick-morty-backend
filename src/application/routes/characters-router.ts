import express from 'express';
import CharacterController from '../controllers/character-controller';
import { catchError } from '../handlers/catch-error';
import S3Bucket from '../../config/s3-config';

const charactersRouter = express.Router();

/* GET Characters */
charactersRouter.get('/characters', catchError(CharacterController.findAll));

charactersRouter.get('/characters/episode', catchError(CharacterController.findByEpisode));

charactersRouter.get('/characters/:id', catchError(CharacterController.findById));

/* POST Character */
charactersRouter.post('/characters', S3Bucket.upload.single('image'), catchError(CharacterController.create));

export default charactersRouter;
