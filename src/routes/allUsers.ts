import express from "express";
import { userService } from "../services/userService";



const router = express.Router();
router.get("/", (req, res) => {
    const users = userService.getUsers();
    res.json(users);
    console.log('users in all users set up', users);
}
);


export default router;



