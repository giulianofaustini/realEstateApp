import express from "express";

import { authService } from "../services/authService";

const router = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
    try {
       await authService.addUser(req.body);
        res.status(201).send("User created");
        console.log('user created', req.body);

    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating user");
    }
   
});


export default router;

