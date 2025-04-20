import UserService from "../services/userService.js";
import asyncHandler from 'express-async-handler';
import { sendSuccess } from '../utils/responseHandler.js';

class UserController {
  static getUser = asyncHandler(async (req, res, next) => {
    const user = await UserService.getUser(req);

    sendSuccess(res, null, user, 200);
  });

  static updateUser = asyncHandler(async (req, res, next) => {
    const updateUser = await UserService.updateUser(req);

    sendSuccess(res, "Succesfully updated.", updateUser, 200);
  });

  static deleteUser = asyncHandler(async (req, res, next) => {
    await UserService.deleteUser(req);

    sendSuccess(res, "Succesfully deleted.", null, 200);
  });
}

export default UserController;
