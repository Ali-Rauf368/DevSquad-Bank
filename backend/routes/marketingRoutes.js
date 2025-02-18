import express from 'express';
import { getPersonalizedOffers, getCollaborativePromotions } from '../controllers/marketingController.js';


const router = express.Router();

// Personalized offers
router.get('/offers/personalized/:transactionId', getPersonalizedOffers);

// Collaborative promotions
router.get('/offers/collaborative', getCollaborativePromotions);

export default router;
