import express from "express";
import QuestionController from "../controllers/questionController.js";

const router = express.Router();

router.get("/", QuestionController.getQuestions);

export default router;