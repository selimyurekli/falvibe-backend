import AuthService from "../services/authService.js";
import BadRequestError from '../errors/BadRequestError.js';
import { sendSuccess } from '../utils/responseHandler.js';
import asyncHandler from 'express-async-handler';

class AuthController {
  static clerkSignIn = asyncHandler(async (req, res, next) => {
    const authUser = req.auth();
    const { token, user } = await AuthService.handleClerkSignIn(authUser);

    sendSuccess(res, "Authentication successful.", { token, user }, 200);
  });
}

export default AuthController;
