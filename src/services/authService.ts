import User from "../models/user.model";
import { UserInterface } from "../interfaces/userInterface";
import bcryptjs from "bcryptjs";
import { NextFunction } from "express";

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
      const { username, email, password, isAdmin , photo } = userData;
  
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
        photo
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
  const { email, password , photo } = userData;

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
        photo
    })

  } catch (error) {
    next(error);
  }
};



const google = async ( req: Request, res: Response, next: NextFunction) => {
 


  const { username, email, photo } = req.body;
  console.log('avatara from google function in backend', photo)


  try {
   
    const user = await User.findOne({ email });
    console.log('user from google functino ',user)
    if (user){
    
      const token = jwt.sign({ _id: user._id }, secret)
   
        res.cookie('access_token', token, {
          httpOnly: true,
        })
        res.status(200).json({
          success: true,
          message: 'User logged in successfully with google account',
          token,
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          createdat: user.createdAt,
          photo
        })
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: username.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
        email: email,
        password: hashedPassword,
        photo
        
      });
      
      await newUser.save();
      const token = jwt.sign({ _id: newUser._id }, secret)
      res.cookie('access_token', token, {
          httpOnly: true,
      })
      res.status(200).json({
          success: true,
          message: 'User logged in successfully',
          token,
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          createdat: newUser.createdAt,
          photo
      })


    }
  } catch (error) {
    next(error);
  }
}

export const authService = {
  addUser,
  signIn,
  google
};
