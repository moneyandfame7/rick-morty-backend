import express from 'express';
import ApiServerConfig from '../../config/api-config.js';
const mainRouter = express.Router();
mainRouter.get('/', (_req, res) => {
    res.send({
        characters: `${ApiServerConfig.BASE_URL}/characters?page=1`,
        episodes: `${ApiServerConfig.BASE_URL}/episodes?page=1`,
        locations: `${ApiServerConfig.BASE_URL}/locations?page=1`,
    });
});
export default mainRouter;
