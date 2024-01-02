import express from "express";
import cors from "cors";


import allHousesRouter from "../src/routes/allHouses";
import allHousesForRentRouter from "../src/routes/allHousesForRent";
import allUsersRouter from "../src/routes/allUsers"



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



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

