import AboutUs from "../models/AboutUs.js";


export const submitFeedback = async (req, res) => {
  try {
    const { name, email, message, type } = req.body;
    if (!name || !email || !message || !type) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const feedback = new AboutUs({ name, email, message, type });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "An error occurred while submitting feedback." });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await AboutUs.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "An error occurred while fetching feedbacks." });
  }
};
