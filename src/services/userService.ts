import { UserInterface } from "../interfaces/userInterface";

import User from "../models/user.model";

const getUsers = async (): Promise<UserInterface[]> => {
  try {
    const users = await User.find();

    const mappedUsers: UserInterface[] = users.map((user) => ({
      _id: user._id?.toString(),
      username: user.username,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      photo: user.avatar,
    }));
    return mappedUsers;
  } catch (err) {
    console.log(err);
    throw new Error("Error while fetching users");
  }
};

const getUser = async (_id: string): Promise<UserInterface | null> => {
  try {
    const user = await User.findOne({ _id });
    const mappedUser: UserInterface | null = user
      ? {
          _id: user._id?.toString(),
          username: user.username,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          photo: user.avatar,
        }
      : null;
    return mappedUser;
  } catch (err) {
    console.log(err);
    throw new Error("Error while fetching user");
  }
};

export const userService = {
  getUsers,
  getUser,
};
