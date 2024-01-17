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

router.delete("/:id", async (req, res, next) => {
    const _id = req.params.id;
    console.log('id from route', _id)
    try {
        const deletedHouse = await housesService.deleteHouseForSale(_id);
        if (deletedHouse) {
            res.json(deletedHouse);
        } else {
            res.status(404).send("House not found");
        }
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    const _id = req.params.id;
    const houseForSaleData = req.body;
    try {
        const updatedHouse = await housesService.updateHouseForSale(_id, houseForSaleData);
        if (updatedHouse) {
            res.json(updatedHouse);
        } else {
            res.status(404).send("House not found");
        }
    } catch (error) {
        next(error);
    }
});

export default router;

