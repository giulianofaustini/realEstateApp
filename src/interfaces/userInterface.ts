export interface UserInterface {
    _id?: string;
  
    username: string;
    email: string;
    password: string;
  
    isAdmin?: boolean | null
    createdAt: Date;
    updatedAt: Date;
    photo?: string | null | undefined;
    }

    