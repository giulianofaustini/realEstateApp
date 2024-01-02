export interface UserInterface {
    id: string;
    username: string;
    email: string;
    password: string;
  
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    }