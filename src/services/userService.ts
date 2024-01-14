
import { UserInterface } from '../interfaces/userInterface';

import User from '../models/user.model';




const getUsers = async (): Promise<UserInterface[]> => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
   console.log(err);
   throw new Error('Error while fetching users');
  } 

}


const getUser = async (userEmail: string): Promise<UserInterface | null> => {
  try {
    const user = await User.findOne( { userEmail});
    return user;
  } catch (err) {
   console.log(err);
   throw new Error('Error while fetching user');
  } 

}



export const userService = {
    getUsers,
    getUser
    
}

