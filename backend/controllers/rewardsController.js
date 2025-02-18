import Reward from '../models/Reward.js';
import User from '../models/User.js';

// Helper function to create a reward
const createReward = async ({ userId, rewardAmount, transactionType, message }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const reward = new Reward({
    user: userId,
    rewardAmount,
    transactionType,
    message: message || '', // Use an empty string if message is not provided
  });

  await reward.save();
  return reward;
};

// Get all rewards
export const getAllRewards = async (req, res) => {
  try {
    // Fetch all rewards and populate user information
    const rewards = await Reward.find().populate('user', 'name email');
    res.status(200).json(rewards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rewards', error });
  }
};

// Give reward to a user
export const giveReward = async (req, res) => {
  const { userId, rewardAmount, transactionType, message } = req.body;

  if (!userId || !rewardAmount || !transactionType) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const reward = await createReward({ userId, rewardAmount, transactionType, message });
    res.status(201).json({ message: 'Reward given successfully', reward: reward.toObject() });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error giving reward', error });
  }
};

// Give eco-friendly reward to a user
export const ecoFriendlyReward = async (req, res) => {
  const { userId, rewardAmount, transactionType, message } = req.body;

  if (!userId || !rewardAmount || !transactionType || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const ecoReward = await createReward({ userId, rewardAmount, transactionType, message });
    res.status(201).json({
      message: 'Eco-friendly reward given successfully',
      ecoReward: ecoReward.toObject(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error giving eco-friendly reward', error });
  }
};
