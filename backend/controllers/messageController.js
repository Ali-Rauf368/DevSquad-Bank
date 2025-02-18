import Message from '../models/Message.js';

/**
 * Send Message Controller
 */
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const adminEmail = 'admin@bankapp.com';

    if (receiverId !== adminEmail && senderId !== adminEmail) {
      return res.status(403).json({ error: 'Messages can only be sent to or from the admin' });
    }

    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    console.error('Error while sending message:', error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};

/**
 * Get Messages Controller
 */
export const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: 'Sender and Receiver IDs are required' });
    }

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error while fetching messages:', error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};

/**
 * Get Conversation History Controller
 */
export const getConversationHistory = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const adminEmail = 'admin@bankapp.com';

    const conversationHistory = await Message.find({
      $or: [
        { senderId: userId, receiverId: adminEmail },
        { senderId: adminEmail, receiverId: userId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(conversationHistory);
  } catch (error) {
    console.error('Error while fetching conversation history:', error);
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};


