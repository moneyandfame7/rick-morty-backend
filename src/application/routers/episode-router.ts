import EpisodeController from '../controllers/episode-controller.js';
import express from 'express';

const episodes = express.Router();

episodes.get('/episodes', EpisodeController.all);

episodes.get('/episodes/:id', EpisodeController.find);

episodes.get('/episodes/character', (req, res) => {
  res.send('episodes/character');
});

export { episodes as episodeRouter };
