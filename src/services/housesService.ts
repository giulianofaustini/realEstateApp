import { housesForSale } from "../data/housesData";
import { housesForRent } from "../data/housesForRentData";
import { NextFunction } from "express";
import { HouseInterface } from "../interfaces/houseInterface"
import { Request, Response } from "express";
import  HouseForSale from "../models/houseForSale.model"


const getHouses = async (): Promise<HouseInterface[]> => {
    try {
        const houses = await HouseForSale.find();
        const convertedHouses = houses.map(house => ({
            _id: house._id.toString(),
            title: house.title,
            description: house.description,
            address: house.address,
            location: house.location,
            price: house.price,
            imageUrl: house.imageUrl,
            bathrooms: house.bathrooms,
            bedrooms: house.bedrooms,
            agent: house.agent
        }));
        console.log('houses from house service when fetching with all houses', convertedHouses);
        return convertedHouses;
    } catch (err) {
        console.log(err);
        throw new Error('Error while fetching houses');
    }
}

const getHousesForRent = ( ) => {
    return housesForRent;
}

const getHouseById = (id: string) => {
    const house = housesForSale.find((house) => house._id === id);
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
    const { _id, title, description, address, location , price, imageUrl, bathrooms, bedrooms, agent } = houseForSaleData;
    try {
        const newHouseForSale = new HouseForSale({
            _id,
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
