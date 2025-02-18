import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['deposit', 'withdrawal', 'transfer', 'payment'] },
  amount: { type: Number, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  cardDetails: { type: String, required: false },
  description: { type: String, required: false },
  category: { type: String, required: false, default: 'General' },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Transaction', transactionSchema);

