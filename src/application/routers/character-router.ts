import CharacterController from '../controllers/character-controller.js';
import express from 'express';

const charactersController = new CharacterController();

const router = express.Router();
router.get('/characters', charactersController.all);

router.get('/characters/:id', charactersController.find);

router.get('/characters', charactersController.create);

export { router as characterRouter };
