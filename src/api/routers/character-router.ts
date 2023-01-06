import express from 'express';
import { characterController } from '../controllers/character-controller.js';

const router = express.Router();

router.post('/characters', characterController.create);

router.get('/characters', characterController.get);

export default router;
