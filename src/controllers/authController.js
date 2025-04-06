import AuthService from "../services/authService.js";
import BadRequestError from '../errors/BadRequestError.js';
import { sendSuccess } from '../utils/responseHandler.js';
import asyncHandler from 'express-async-handler';

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
