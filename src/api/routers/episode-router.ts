import express from 'express';
import EpisodeController from '../controllers/episode-controller.js';

const router = express.Router();

router.post('/episodes', EpisodeController.create);

export default router;
