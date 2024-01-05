import express, { NextFunction } from "express";

import { authService } from "../services/authService";

const router = express.Router();

router.post(
  "/",
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      await authService.signIn(req.body, req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export default router;
