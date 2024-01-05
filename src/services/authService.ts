import User from "../models/user.model";
import { UserInterface } from "../interfaces/userInterface";
import bcryptjs from "bcryptjs";
import { NextFunction } from "express";
import { errorHandler } from "../utils/error";

const addUser = async (
  userData: UserInterface,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password, isAdmin } = userData;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });
    await newUser.save();
    console.log("User added successfully");
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

const signIn = async (
  userData: UserInterface,
  next: NextFunction
): Promise<void> => {
  const { email, password } = userData;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      const error: Error & { statusCode?: number } = new Error(
        "User with this email does not exist"
      );
      error.statusCode = 400;
      throw error;
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      const error: Error & { statusCode?: number } = new Error(
        "Wrong credentials"
      );
      error.statusCode = 400;
      throw error;
    }

  } catch (error) {
    next(error);
  }
};

export const authService = {
  addUser,
  signIn,
};
