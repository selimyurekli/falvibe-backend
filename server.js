import express from "express";
import cors from "cors";
import connectDB from "./src/config/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import fortuneTellerRoutes from "./src/routes/fortuneTellerRoutes.js";
import questionRoutes from "./src/routes/questionRoutes.js";
import coffeRoutes from "./src/routes/coffeeRoutes.js";
import fileRoutes from "./src/routes/fileRoutes.js";
import globalErrorHandler from './src/middlewares/errorHandler.js';
import NotFoundError from './src/errors/NotFoundError.js';
import dotenv from "dotenv";
import authMiddleware from "./src/middlewares/authMiddleware.js"
import { clerkMiddleware} from '@clerk/express'
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.use(clerkMiddleware());

// Routes
app.use("/auth", authRoutes);
app.use("/user", authMiddleware, userRoutes);
app.use("/fortune-teller", fortuneTellerRoutes);
app.use("/questions", questionRoutes);
app.use("/coffee", authMiddleware, coffeRoutes);
app.use("/file", authMiddleware, fileRoutes);

// --- Handle Undefined Routes (404) ---
app.all('*', (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`, { code: 'ROUTE_NOT_FOUND' }));
});

app.use(globalErrorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
