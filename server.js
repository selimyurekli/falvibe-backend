import express from "express";
import cors from "cors";
import connectDB from "./src/config/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import globalErrorHandler from './src/middlewares/errorHandler.js';
import NotFoundError from './src/errors/NotFoundError.js';
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// --- Handle Undefined Routes (404) ---
app.all('*', (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`, { code: 'ROUTE_NOT_FOUND' }));
});

app.use(globalErrorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
