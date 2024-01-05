import User from '../models/user.model';
import { UserInterface } from "../interfaces/userInterface";
import bcryptjs from "bcryptjs";
import { NextFunction } from 'express';
import { errorHandler } from "../utils/error"

const addUser = async (userData: UserInterface, next: NextFunction): Promise<void> => {
    try {
        const { username, email, password, isAdmin } = userData;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, isAdmin });
        await newUser.save();
        console.log('User added successfully');
    } catch (error) {
       
        next(errorHandler(500, "Internal Server Error")     );
    }
};

export const authService = {
    addUser,
};
