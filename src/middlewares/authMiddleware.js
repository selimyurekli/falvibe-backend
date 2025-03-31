import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
 /*
  *TODO:Make adapt error handling structure to this middleware.
  */

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authMiddleware;