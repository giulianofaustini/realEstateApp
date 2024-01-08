import { UserInterface } from "../interfaces/userInterface";

export const users: UserInterface[] = [
  {
    id: "1",
    username: "Matti Virtanen",
    email: "matti.virtanen@example.com",
    password: "password123",
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    username: "Anna Koskinen",
    email: "anna.koskinen@example.com",
    password: "password456",
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
