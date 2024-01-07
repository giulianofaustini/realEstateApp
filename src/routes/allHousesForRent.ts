import express from "express";

import { housesService } from "../services/housesService";


const router = express.Router();

router.get("/", (req, res) => {
    const housesForRent = housesService.getHousesForRent();
    res.json(housesForRent);
    console.log('houses for rent in all houses set up', housesForRent);
} 
);

router.get("/rent/:id", (req, res) => {
    const id = req.params.id;
    const housesForRent = housesService.getHouseForRentById(id);
    if (housesForRent) {
        res.json(housesForRent);
    } else {
        res.status(404).send("House not found");
    }
}
);

router.post("/", (req, res, next) => {
    const houseForRentData = req.body;
    housesService.createHouseForRent(houseForRentData, req, res, next);
}
);


export default router;
