import { auth } from "google-auth-library";
import AuthService from "../services/authService.js";
import { sendSuccess } from '../utils/responseHandler.js';
import asyncHandler from 'express-async-handler';

class AuthController {
  static clerkSignIn = asyncHandler(async (req, res, next) => {
    const authUser = req.auth();
  
    const { user } = await AuthService.handleClerkSignIn(authUser);

    sendSuccess(res, "Authentication successful.", { user }, 200);
  });
}

export default AuthController;
