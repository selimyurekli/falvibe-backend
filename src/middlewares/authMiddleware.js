import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AuthenticationError from "../errors/AuthenticationError.js";
import { getAuth } from '@clerk/express';

dotenv.config();

const authMiddleware = async (req, res, next) => {
  if (req.auth().isAuthenticated) {
    const {userId} = getAuth(req);
    req.userId = userId;
    next();
  } else {
    throw new AuthenticationError("Authentication failed: Invalid or expired token.", { code: 'INVALID_TOKEN' });
  }
};

export default authMiddleware;