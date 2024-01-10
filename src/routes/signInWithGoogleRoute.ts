import express, { NextFunction } from "express";

import { authService } from "../services/authService";

const router = express.Router();

router.post(
  "/",
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      await authService.google(req, res, next);
      console.log('req.body from google route', req.body)
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);




export default router;
