import AuthService from "../services/authService.js";
import BadRequestError from '../errors/BadRequestError.js'; // Import specific error
import { sendSuccess } from '../utils/responseHandler.js'; // No need for sendError here
import asyncHandler from 'express-async-handler'; // Import asyncHandler

class AuthController {
  static googleSignIn = asyncHandler(async (req, res, next) => {
    const { idToken } = req.body;
    if (!idToken) {
      throw new BadRequestError("ID token is required.", { code: 'MISSING_ID_TOKEN' });
    }

    const { token, user } = await AuthService.handleGoogleSignIn(idToken);

    sendSuccess(res, "Authentication successful.", { token, user }, 200);
  });
}

export default AuthController;
