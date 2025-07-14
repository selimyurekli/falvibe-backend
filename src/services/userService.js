import User from "../models/User.js";
import BadRequestError from "../errors/BadRequestError.js"

class UserService {
  static async getUser(req) {
    const user = await User.findOne({clerkId: req.userId});

    if(!user) {
      throw new BadRequestError("User is not found. ", { code: 'INVALID_USER_ID' });
    }

    return user;
  }

  static async updateUser(req) {
    const user = await this.getUser(req);
    const allowedFields = ['gender', 'birthDate'];

    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        user[key] = req.body[key];
      }
    }

    await user.save(); // Burada `pre('save')` tetiklenir
    return user;
  }

  static async deleteUser(req) {
    const deletedUser = await User.findOneAndDelete({clerkId: req.userId});
    if(!deletedUser) {
      throw new BadRequestError("User is not found. ", { code: 'INVALID_USER_ID' });
    }
  }
}

export default UserService;
