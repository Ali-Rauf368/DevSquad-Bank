import express from 'express';
import { getUserProfile, updateUser } from '../controllers/userController.js';

const router = express.Router();

// Route to view user profile by ID
router.get('/profile/:id', getUserProfile);

// Route to update user profile by ID
router.put('/profile/:id', updateUser);

export default router;
