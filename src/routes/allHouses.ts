import express from "express";

import { housesService } from "../services/housesService";


const router = express.Router();

router.get("/", async (req, res) => {
    const housesForSale = await housesService.getHouses();
    res.json(housesForSale);
    console.log('houses from  route', housesForSale);
}
);


router.get("/sale/:id", async (req, res) => {
    const id = req.params.id;
    const house = await housesService.getHouseById(id);
    if (house) {
        res.json(house);
    } else {
        res.status(404).send("House not found");
    }
}
);

router.post("/", (req, res, next) => {
    const houseForSaleData = req.body;
    housesService.createHouseForSale(houseForSaleData, req, res, next);
}
);

export default router;

