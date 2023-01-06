import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send({
    characters: `${process.env.BASE_URL}/characters`,
    episodes: `${process.env.BASE_URL}/episodes`,
    locations: `${process.env.BASE_URL}/locations`,
  });
});

export default router;
