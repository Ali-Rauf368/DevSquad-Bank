import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  businessPartner: { type: String, required: true },
  category: { type: String, required: true },
  discount: { type: Number, required: true }, 
  validUntil: { type: Date, required: true },
});

const Offer = mongoose.model('Offer', offerSchema);

export default Offer; 
