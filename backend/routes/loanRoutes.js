import express from 'express';
import { createLoanRequest, updateLoanStatus, getUserLoanRequests, getAllLoanRequests } from '../controllers/loanController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route for creating a loan request (User submits)
router.post('/request', createLoanRequest); // Removed authMiddleware

// Route for admin to view all loan requests and approve/reject
router.get('/admin/requests', authMiddleware, getAllLoanRequests);

// Route for admin to update loan status (approve or reject) along with a message
router.put('/update/:loanId', authMiddleware, updateLoanStatus);

// Route for user to view their loan requests (with status and adminMessage)
// In your backend
// Route for user to view their loan requests (with status and adminMessage)
router.get('/status', getUserLoanRequests);


export default router;
