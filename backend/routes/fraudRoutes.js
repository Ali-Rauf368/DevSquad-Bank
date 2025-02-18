import express from 'express';
import { fraudDetection } from '../middlewares/fraudDetection.js';
import { flagPotentialFraud } from '../controllers/fraudController.js';

const router = express.Router();


router.post('/detect', fraudDetection, flagPotentialFraud);

export default router;
