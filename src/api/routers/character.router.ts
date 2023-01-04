import express from 'express';
import CharacterController from '../controllers/CharacterController.js';

const router = express.Router();

router.post('/characters', CharacterController.create);

export default router;
