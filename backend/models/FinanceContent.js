import mongoose from 'mongoose';

const financeContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Article', 'Blog', 'Press Release', 'Event Announcement', 'Tip'],
      required: true,
    },
    image: {
      type: String,
      required: true, // Image URL or file path
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true } 
);

const FinanceContent = mongoose.model('FinanceContent', financeContentSchema);
export default FinanceContent;