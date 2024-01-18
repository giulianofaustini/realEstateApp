import express from "express";

import { housesService } from "../services/housesService";


const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    const housesForRent = await housesService.getHousesForRent();
    res.json(housesForRent);
    console.log('houses for rent in all houses set up', housesForRent);
} 
);



router.get("/rent/:id", async (req, res) => {
    const id = req.params.id;
    const housesForRent = await housesService.getHouseForRentById(id);
    console.log('houses for rent in GET RENT WITH ID set up', housesForRent);
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

router.delete("/:id", (req, res, next) => {
    const _id = req.params.id;
    
    try {

        const deletedHouse = housesService.deleteHouseForRent(_id);
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
    const houseForRentData = req.body;
    // console.log('BACKEND before updated house for rent data in put', houseForRentData);

    try {
        const updatedHouse = await housesService.updateHouseForRent(_id, houseForRentData);

        if (updatedHouse) {
            res.json(updatedHouse);
            // console.log('BACKEND updated house in put', updatedHouse);
        } else {
            res.status(404).send("House not found");
        }
    } catch (error) {
        next(error);
    }
});




export default router;
