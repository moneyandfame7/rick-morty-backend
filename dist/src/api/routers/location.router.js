import express from 'express';
import LocationController from '../controllers/LocationController.js';
const router = express.Router();
router.post('/locations', LocationController.create);
export default router;
//# sourceMappingURL=location.router.js.map