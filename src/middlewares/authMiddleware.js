import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(" ")[1] : null;

  if (!token) {
    throw new AuthenticationError("Authentication failed: No token found.", { code: 'NO_TOKEN_FOUND' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    console.error(error)
    throw new AuthenticationError("Authentication failed: Invalid or expired token.", { code: 'INVALID_TOKEN' });
  }
};

export default authMiddleware;