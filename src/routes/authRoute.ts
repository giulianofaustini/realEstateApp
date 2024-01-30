import express, { NextFunction } from "express";

import { authService } from "../services/authService";
import User from "../models/user.model";

const router = express.Router();

router.post(
  "/",
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        const error: Error & { statusCode?: number } = new Error(
          "User with this email or username already exists"
        );
        error.statusCode = 400;
        throw error;
      }

      await authService.addUser(req.body, req, res, next);
      console.log("user created", req.body);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);




router.delete(
  "/:id",
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      if (req.params.id !== req.body._id) {
        console.log("ID PARAMS req.params.id", req.params.id);
        console.log("ID BODYreq.body._id", req.body._id);
        const error: Error & { statusCode?: number } = new Error(
          "You are not allowed to delete this user"
        );
        error.statusCode = 400;
        throw error;
      }
      await authService.deleteUser(req.params.id, req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
