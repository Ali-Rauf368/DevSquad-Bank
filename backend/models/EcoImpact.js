import mongoose from 'mongoose';

const ecoImpactSchema = new mongoose.Schema(
    {
        transactionId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Transaction', 
            required: true,
            index: true
        },
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true,
            index: true
        },
        ecoScore: { 
            type: Number, 
            required: true,
            min: 0
        },
        description: {
            type: String, 
            default: null, 
            trim: true
        },
    },
    { 
        timestamps: true
    }
);

// Compound index for unique user and transaction relationships
ecoImpactSchema.index({ transactionId: 1, userId: 1 }, { unique: true });

export default mongoose.model('EcoImpact', ecoImpactSchema);
