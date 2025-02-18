import express from 'express';
import { sendMessage, getMessages, getConversationHistory } from '../controllers/messageController.js';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/messages', getMessages);
router.get('/conversation', getConversationHistory);

export default router;
