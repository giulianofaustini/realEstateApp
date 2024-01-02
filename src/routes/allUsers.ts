import express from "express";
import { userService } from "../services/userService";



const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
        console.log('Users fetched:', users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
        console.error('Error fetching users:', error);
    }
});



export default router;



