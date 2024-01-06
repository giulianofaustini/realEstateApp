import User from "../models/user.model";
import { UserInterface } from "../interfaces/userInterface";
import bcryptjs from "bcryptjs";
import { NextFunction } from "express";
import { errorHandler } from "../utils/error";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";



const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }


  const addUser = async (
    userData: UserInterface,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username, email, password, isAdmin } = userData;
  
      if (username.length < 3) {
        const error: Error & { statusCode?: number } = new Error(
          "Username must contain at least 3 characters"
        );
        error.statusCode = 400;
        throw error;
      }
  
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        isAdmin,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' }); 
    } catch (error) {
      next(error);
    }
  };

const signIn = async (
  userData: UserInterface,
  req: Request,
  res: Response,
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

    const token = jwt.sign({ _id: validUser._id }, secret)
    res.cookie('access_token', token, {
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token,
        _id: validUser._id,
        username: validUser.username,
        email: validUser.email,
        isAdmin: validUser.isAdmin,
        createdat: validUser.createdAt,
    })

  } catch (error) {
    next(error);
  }
};

export const authService = {
  addUser,
  signIn,
};
