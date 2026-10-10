import { Router } from 'express';
import * as aiController from '../controllers/aiController.js';

const router = Router();

router.post('/chat', aiController.chat);
router.post('/reset', aiController.reset);

export default router;
