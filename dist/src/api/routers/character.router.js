import express from 'express';
import { characterController } from '../controllers/CharacterController.js';
const router = express.Router();
router.post('/characters', characterController.create);
router.get('/characters', characterController.get);
export default router;
//# sourceMappingURL=character.router.js.map