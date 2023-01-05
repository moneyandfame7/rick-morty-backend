import express from 'express';
import EpisodeController from '../controllers/EpisodeController.js';
const router = express.Router();
router.post('/episodes', EpisodeController.create);
export default router;
