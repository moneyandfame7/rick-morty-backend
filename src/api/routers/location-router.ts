import express from 'express';
import LocationController from '../controllers/location-controller.js';

const router = express.Router();

router.post('/locations', LocationController.create);
router.get('/locations', LocationController.get);

export default router;
