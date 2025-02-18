import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  adminMessage: { type: String, default: '' },
  approvedAmount: { type: Number, default: 0 },
  interest: { type: Number, default: 0 },
  returnDate: { type: Date },
  terms: { type: String, default: '' },
}, { timestamps: true });

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;
