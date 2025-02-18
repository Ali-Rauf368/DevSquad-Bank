import Insight from '../models/Insight.js';

// Controller to get all insights (GET)
export const getInsights = async (req, res) => {
  try {
    const insights = await Insight.find({});
    res.status(200).json(insights);
  } catch (error) {
    console.error('Error while fetching insights:', error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};

// Controller to update insights (POST)
export const updateInsights = async (req, res) => {
  try {
    const { userId, insights } = req.body;
    
    // Validate that userId and insights are present in the body
    if (!userId || !insights) {
      return res.status(400).json({ error: 'User ID and insights data are required' });
    }

    // Check if insights already exist for the user
    const existingInsight = await Insight.findOne({ userId });
    if (existingInsight) {
      // Update existing insights
      existingInsight.insights = { ...existingInsight.insights, ...insights };
      await existingInsight.save();
      return res.status(200).json(existingInsight);
    }

    // Create new insights if they do not exist for the user
    const newInsight = new Insight({ userId, insights });
    await newInsight.save();
    res.status(201).json(newInsight);
  } catch (error) {
    console.error('Error while updating insights:', error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};
