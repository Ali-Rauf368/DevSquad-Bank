import mongoose from 'mongoose';

const insightSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    insights: {
      totalDeposits: { type: Number, default: 0 },
      totalWithdrawals: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Insight = mongoose.model('Insight', insightSchema);

export default Insight;
