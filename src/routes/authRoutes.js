import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();

// POST /auth/google/signin
router.post("/clerk/signin", AuthController.clerkSignIn);

export default router;