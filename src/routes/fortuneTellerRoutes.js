import express from "express";
import FortuneTellerController from "../controllers/fortuneTellerController.js";

const router = express.Router();

router.get("/list", FortuneTellerController.getAllFortuneTellers);

export default router;