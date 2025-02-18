import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getAllRewards, giveReward, ecoFriendlyReward } from '../controllers/rewardsController.js';

const router = express.Router();

// Get all users who have received rewards
router.get('/all-rewards', authMiddleware, getAllRewards);

// Give reward to a user based on transaction type (simple or eco-friendly)
router.post('/give-reward', authMiddleware, giveReward);

// Reward based on eco-friendly transaction
router.post('/eco-friendly-reward', authMiddleware, ecoFriendlyReward);

export default router;
