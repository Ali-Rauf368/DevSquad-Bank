import express from 'express';
import {
  createContent,
  getAllContent,
  updateContent,
  deleteContent,
} from '../controllers/financeContentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { uploadImage } from '../controllers/financeContentController.js'; // Import uploadImage from controller

const router = express.Router();

// Public route to get all content
router.get('/content', getAllContent);

// Admin routes to create, update, and delete content (protected by authMiddleware)
// Attach multer uploadImage middleware to the POST route to handle image upload
router.post('/content', authMiddleware, uploadImage, createContent);
router.put('/content/:contentId', authMiddleware, updateContent);
router.delete('/content/:contentId', authMiddleware, deleteContent);

export default router;