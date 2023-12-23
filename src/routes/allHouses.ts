import express from "express";

import { housesService } from "../services/housesService";


const router = express.Router();

router.get("/", (req, res) => {
    const houses = housesService.getHouses();
    res.json(houses);
}
);

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const house = housesService.getHouseById(id);
    if (house) {
        res.json(house);
    } else {
        res.status(404).send("House not found");
    }
}
);

export default router;