import express from "express";
import { submitFeedback, getFeedbacks } from "../controllers/AboutUsController.js";

const router = express.Router();

router.post("/submit-feedback", submitFeedback);
router.get("/feedbacks", getFeedbacks);

export default router;
