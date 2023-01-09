import express from 'express';
import ApiServerConfig from '../../config/api-config.js';

const mainRouter = express.Router();

mainRouter.get('/', (_req, res) => {
  res.send({
    characters: `${ApiServerConfig.BASE_URL}/characters`,
    episodes: `${ApiServerConfig.BASE_URL}/episodes`,
    locations: `${ApiServerConfig.BASE_URL}/locations`,
  });
});

export default mainRouter;
