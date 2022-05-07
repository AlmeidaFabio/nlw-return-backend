import { Router } from "express";
import { FeedbackController } from "../controllers/FeedbackController";

const feedbackController = new FeedbackController;

const router = Router();

router.post('/feedback', feedbackController.create)

export { router }