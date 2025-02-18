import express from 'express';
import { getInsights, updateInsights } from '../controllers/insightsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';  // Optional if you need authentication

const router = express.Router();

// Route to get insights (GET)
router.get('/', authMiddleware, getInsights);

// Route to update insights (POST)
router.post('/', authMiddleware, updateInsights);

export default router;
