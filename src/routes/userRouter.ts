import express from "express";
import { userService } from "../services/userService";



const router = express.Router();

router.get("/:userEmail", async (req, res) => {
    try {
      const users = await userService.getUser(req.params.userEmail);
      res.json(users);
      console.log('Users fetched:', users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
      console.error('Error fetching user:', error);
    }
  });


export default router;


