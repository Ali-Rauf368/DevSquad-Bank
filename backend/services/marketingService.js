import Offer from '../models/Offer.js';

class MarketingService {
  // Method to analyze spending habits based on user's transactions
  static async analyzeSpendingHabits(userId) {
    try {
      console.log('Analyzing spending habits for user:', userId);

      // Fetch all transactions for the user
      const transactions = await Transaction.find({ sender: userId });

      // Check if transactions are available
      if (!transactions || transactions.length === 0) {
        console.log('No transactions found for this user.');
        return { topCategory: null, offers: [] };
      }

      // Extract the description (spending category) from each transaction
      const categories = transactions.map(transaction => transaction.description);

      // Check if the categories array is empty
      if (categories.length === 0) {
        console.log('No categories found in the transactions.');
        return { topCategory: null, offers: [] };
      }

      // Use reduce to find the most frequent category
      const topCategory = categories.reduce((acc, category) => {
        if (category) {
          acc[category] = (acc[category] || 0) + 1;
        }
        return acc;
      }, {});

      // If no categories were found, return empty result
      if (Object.keys(topCategory).length === 0) {
        console.log('No valid categories found.');
        return { topCategory: null, offers: [] };
      }

      // Sort categories by frequency and get the most frequent one
      const sortedCategories = Object.entries(topCategory).sort((a, b) => b[1] - a[1]);
      const mostFrequentCategory = sortedCategories[0] ? sortedCategories[0][0] : null;

      // Fetch offers based on the most frequent category
      const offers = await this.getOffersBasedOnCategory(mostFrequentCategory);

      console.log('Most frequent category:', mostFrequentCategory);
      return {
        topCategory: mostFrequentCategory,
        offers: offers || [],
      };
    } catch (error) {
      console.error('Error in analyzeSpendingHabits:', error);
      throw new Error(error.message);
    }
  }

  // Fetch offers based on a spending category
  static async getOffersBasedOnCategory(category) {
    if (!category) return []; // Return empty if no category

    // Example logic to fetch offers based on the category
    const offers = await Offer.find({ category });  // Assume Offer model has a 'category' field
    return offers.map(offer => ({
      offerId: offer._id,
      description: `Special offer for ${category}: ${offer.description}`,
    }));
  }

  // Fetch collaborative promotions for a given category
  static async getCollaborativePromotions(category) {
    if (!category) return []; // Return empty if no category

    // Example logic for promotions
    const promotions = await Offer.find({ category });
    return promotions.map(promotion => ({
      promotionId: promotion._id,
      description: `Collaborative promotion for ${category}: ${promotion.description}`,
    }));
  }
}

export default MarketingService;
