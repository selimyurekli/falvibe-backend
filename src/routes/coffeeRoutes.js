import express from "express";
import CoffeeController from "../controllers/coffeeController.js";

const router = express.Router();

router.post("/read", CoffeeController.readCoffeeReading);

export default router;