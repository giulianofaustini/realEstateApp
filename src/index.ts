import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute";
dotenv.config();
import cookieParser from "cookie-parser";
import allHousesRouter from "../src/routes/allHouses";
import allHousesForRentRouter from "../src/routes/allHousesForRent";
import allUsersRouter from "../src/routes/allUsers";
import signInRoute from "../src/routes/signInRoute";
import signinWithGoogleRoute from "../src/routes/signInWithGoogleRoute";
import userRouter from "../src/routes/userRouter";

const app = express();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;
const allowedOrigins = [
  "https://sharestate.onrender.com",
  "http://localhost:5173",
];

mongoose
  .connect(process.env.MONGO ?? "")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the Real Estate API!");
});

app.use(express.static("dist"));

app.use("/api/housesForSale", allHousesRouter);

app.use("/api/housesForRent", allHousesForRentRouter);

app.use("/api/users", allUsersRouter);

app.use("/api/userHouses", userRouter);

app.use("/api/sign-up", authRouter);

app.use("/api/sign-in", signInRoute);

app.use("/api/auth/google", signinWithGoogleRoute);

app.use("/api/create-house-for-sale", allHousesRouter);

app.use("/api/create-house-for-rent", allHousesForRentRouter);

app.use("/api/delete-house-for-sale", allHousesRouter);

app.use("/api/delete-house-for-rent", allHousesForRentRouter);

app.use("/api/update-house-for-sale", allHousesRouter);

app.use("/api/update-house-for-rent", allHousesForRentRouter);

// app.use((req, res) => {
//   res.redirect('https://sharestate.onrender.com');
// });

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
