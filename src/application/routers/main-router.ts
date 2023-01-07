import ApiServerConfig from '../../config/api-config.js';
import express from 'express';

const router = express.Router();
router.get('/', (_req, res) => {
  res.send({
    characters: `${ApiServerConfig.BASE_URL}/characters`,
    episodes: `${ApiServerConfig.BASE_URL}/episodes`,
    locations: `${ApiServerConfig.BASE_URL}/locations`,
  });
});

export { router as mainRouter };
