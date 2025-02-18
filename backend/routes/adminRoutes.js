import express from 'express';
import {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginAdmin,
} from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin login route (no auth middleware here)
router.post('/login', loginAdmin);

// Protected routes
router.put('/user/:id', authMiddleware, updateUser);
router.delete('/user/:id', authMiddleware, deleteUser);
router.get('/users', authMiddleware, getAllUsers);
router.get('/user/:id', authMiddleware, getUser);

export default router;
