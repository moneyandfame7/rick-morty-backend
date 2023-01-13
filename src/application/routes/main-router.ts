import express from 'express';
import ApiServerConfig from '../../config/api-config.js';

const mainRouter = express.Router();

mainRouter.get('/', (_req, res) => {
  res.send({
    characters: `${ApiServerConfig.BASE_URL}/api/characters`,
    episodes: `${ApiServerConfig.BASE_URL}/api/episodes`,
    locations: `${ApiServerConfig.BASE_URL}/api/locations`,
  });
});

export default mainRouter;
