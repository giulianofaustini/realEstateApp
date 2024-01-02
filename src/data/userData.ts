import { UserInterface } from '../interfaces/userInterface';



export const users: UserInterface[] = [ 
    {
        id: '1',
        name: 'Matti Virtanen',
        email: 'matti.virtanen@example.com',
        password: 'password123',
        phoneNumber: '123-456-789',
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
        {
        id: '2',
        name: 'Anna Koskinen',
        email: 'anna.koskinen@example.com',
        password: 'password456',
        phoneNumber: '987-654-321',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

]
