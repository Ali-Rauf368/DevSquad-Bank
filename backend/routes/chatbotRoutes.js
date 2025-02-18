import { Router } from 'express';
import { getResponse } from '../ai/chatbotService.js';

const router = Router();

router.post('/chat', (req, res) => {
  const { message } = req.body;
  const response = getResponse(message);
  res.json({ response });
});

export default router;
