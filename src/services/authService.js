import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import BaseError from "../errors/BaseError.js";
import AuthenticationError from "../errors/AuthenticationError.js";
import { clerkClient } from '@clerk/express';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthService {

  static async handleClerkSignIn(authUser) {
    try {
      if (!authUser || !authUser.isAuthenticated) {
        throw new AuthenticationError("Authentication failed: Invalid token payload.", { code: 'INVALID_TOKEN_PAYLOAD' });
      }

      const userInfo = await clerkClient.users.getUser(authUser.userId);

      const userProfile = {
        id: userInfo.id,
        email: userInfo.emailAddresses?.[0]?.emailAddress,
        name: `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim(),
        avatar: userInfo.imageUrl,
      };

      const user = await this.findOrCreateUser(userProfile);
      const token = this.generateToken(user);

      return {
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      };

    } catch (error) {
      if (error instanceof BaseError && error.isOperational) {
          throw error;
      }

      if (error.message.includes("Invalid token") || error.message.includes("audience") || error.message.includes("Could not verify signature")) {
         throw new AuthenticationError("Authentication failed: Invalid Google token.", { code: 'INVALID_GOOGLE_TOKEN' });
      }

      throw error;
    }
  }

  static async findOrCreateUser(profile) {
    try {
      let user = await User.findOne({ clerkId: profile.id });

      if (!user) {
        user = new User({
          clerkId: profile.id,
          name: profile.name,
          email: profile.email,
          avatar: profile.avatar,
        });
        await user.save();
        console.log(`New user created: ${user.email}`);
      } else {
        let needsUpdate = false;

        if (profile.name && user.name !== profile.name) {
          user.name = profile.name;
          needsUpdate = true;
        }
        if (profile.avatar && user.avatar !== profile.avatar) {
          user.avatar = profile.avatar;
          needsUpdate = true;
        }

        if (profile.email && user.email !== profile.email) {
          console.warn(`User email mismatch for googleId ${profile.id}. DB: ${user.email}, Profile: ${profile.email}. Updating email.`);
          user.email = profile.email;
          needsUpdate = true;
        }

        if (needsUpdate) {
            await user.save();
            console.log(`User updated: ${user.email}`);
        } else {
             console.log(`User found, no update needed: ${user.email}`);
        }
      }

      return user;
    } catch (error) {
      console.error("AuthService findOrCreateUser error:", error);
      throw error;
    }
  }

  static generateToken(user) {
    return jwt.sign(
      { id: user._id, email: user.email, name: user.name},
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN}
    );
  }
}

export default AuthService;
