import Transaction from '../models/Transaction.js';

// Get personalized offers based on a transaction ID
export const getPersonalizedOffers = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId).populate('sender');
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const personalizedOffers = [
      {
        offerId: 'offer1',
        description: `10% off on items from your spending category: ${transaction.type}`,
      },
      {
        offerId: 'offer2',
        description: `Exclusive offer for ${transaction.sender?.name || 'user'}: Free shipping on your next purchase!`,
      },
    ];

    res.status(200).json({ personalizedOffers });
  } catch (error) {
    console.error('Error fetching personalized offers:', error.message);
    res.status(500).json({ message: 'Error retrieving personalized offers' });
  }
};

// Get collaborative promotions based on a category
export const getCollaborativePromotions = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const collaborativePromotions = [
      {
        promotionId: 'promo1',
        description: `20% off on all ${category} items this week!`,
      },
      {
        promotionId: 'promo2',
        description: `Buy one ${category} item, get one free!`,
      },
    ];

    res.status(200).json({
      message: 'Collaborative promotions retrieved successfully',
      promotions: collaborativePromotions,
    });
  } catch (error) {
    console.error('Error fetching collaborative promotions:', error.message);
    res.status(500).json({ message: 'Error retrieving collaborative promotions' });
  }
};
