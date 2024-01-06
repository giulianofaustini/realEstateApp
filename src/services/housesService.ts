import { housesForSale } from "../data/housesData";
import { housesForRent } from "../data/housesForRentData";
import { NextFunction } from "express";
import { HouseInterface } from "../interfaces/houseInterface"
import { Request, Response } from "express";
import  HouseForSale from "../models/houseForSale.model"


const getHouses = ( ) => {
    return housesForSale;
}

const getHousesForRent = ( ) => {
    return housesForRent;
}

const getHouseById = (id: string) => {
    const house = housesForSale.find((house) => house.id === id);
    return house;
}

const getHouseForRentById = (id: string) => {
    const house = housesForRent.find((house) => house.id === id);
    return house;
}

const createHouseForSale = async (
    houseForSaleData: HouseInterface,
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    const { title, description, address, location , price, imageUrl, bathrooms, bedrooms, agent } = houseForSaleData;
    try {
        const newHouseForSale = new HouseForSale({
            title,
            description,
            address,
            location,
            price,
            imageUrl,
            bathrooms,
            bedrooms,
            agent
        });
        await newHouseForSale.save();
        res.status(201).json({ message: 'House created successfully' });
    } catch (error) {
        next(error);
    }
}




export const housesService = {
    getHouses,
    getHouseById,
    getHousesForRent,
    getHouseForRentById,
    createHouseForSale
}
