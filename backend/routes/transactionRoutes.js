import express from 'express';
import {
  deposit,
  withdraw,
  transfer,
  getTransactionHistory,
} from '../controllers/transactionController.js';

const router = express.Router();

router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.post('/transfer', transfer);
router.get('/:userId/transactions', getTransactionHistory);

export default router;
