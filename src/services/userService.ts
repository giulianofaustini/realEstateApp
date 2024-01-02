
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




export const userService = {
    getUsers,
    
}

