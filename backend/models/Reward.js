import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rewardAmount: {
    type: Number,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['simple', 'eco-friendly'],
    required: true,
  },
  message: {
    type: String,
    default: '', // Optional message
  },
}, { timestamps: true });

const Reward = mongoose.model('Reward', rewardSchema);

export default Reward; // Default export for the Reward model
