import User from '../models/user.model';
import { UserInterface } from "../interfaces/userInterface"
import bcryptjs from "bcryptjs";

const addUser = async (userData: UserInterface): Promise<void> => {
    const { username, email, password, isAdmin } = userData;
    const hashedPassword =  bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, isAdmin });
    await newUser.save();
};

export const authService = {
    addUser,
};

