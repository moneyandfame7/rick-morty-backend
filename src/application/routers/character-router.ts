import CharacterController from '../controllers/character-controller.js';
import express from 'express';

const router = express.Router();
router.get('/characters', CharacterController.all);

router.get('/characters/:id', CharacterController.find);

router.post('/characters', CharacterController.create);

export { router as characterRouter };
