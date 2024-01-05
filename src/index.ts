import express, { NextFunction , Request, Response,} from "express";

import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute";
dotenv.config();

import allHousesRouter from "../src/routes/allHouses";
import allHousesForRentRouter from "../src/routes/allHousesForRent";
import allUsersRouter from "../src/routes/allUsers"

mongoose.connect(process.env.MONGO ?? "").then(() => {
  console.log("Connected to MongoDB");
}
).catch(err => console.log("Error connecting to MongoDB", err));
const app = express();
const port = 3000;

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
))
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to the Real Estate API!");
});




app.use("/api/housesForSale", allHousesRouter);

app.use("/api/housesForRent", allHousesForRentRouter);

app.use("/api/users", allUsersRouter);

app.use("/api/sign-up", authRouter );

app.use((err: { statusCode?: number, message?: string }, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ 
    success: false,
    statusCode,
    message,
   });
});

  


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

