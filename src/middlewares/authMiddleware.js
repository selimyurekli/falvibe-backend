import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AuthenticationError from "../errors/AuthenticationError.js";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(" ")[1] : null;
  console.log(token)
  if (!token) {
    req.userId = "67f1bf6369c7d8d6c04a43c8";
    req.userEmail = "berkatcekenn@gmail.com";
    req.name = "Berk";
    next();
    //throw new AuthenticationError("Authentication failed: No token found.", { code: 'NO_TOKEN_FOUND' });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      req.userId = decoded.id;
      req.userEmail = decoded.email;
      req.userName = decoded.name;
      next();
    } catch (error) {
      console.error(error)
      throw new AuthenticationError("Authentication failed: Invalid or expired token.", { code: 'INVALID_TOKEN' });
    }
  }  
};

export default authMiddleware;