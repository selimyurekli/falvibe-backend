import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router.get("/", UserController.getUser);
router.put("/", UserController.updateUser);
router.delete("/", UserController.deleteUser);

export default router;