import { housesForSale } from "../data/housesData";
import { housesForRent } from "../data/housesForRentData";
import { NextFunction } from "express";
import { HouseInterface } from "../interfaces/houseInterface"
import { Request, Response } from "express";
import  HouseForSale from "../models/houseForSale.model"
import  {housesForRentInterface} from "../interfaces/housesForRentInterface"
import HouseForRent from "../models/HouseForRentModel"
import User from "../models/user.model";


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
            agent: house.agent,
            addedBy: house.addedBy?.toString()
        }));
        console.log('houses from house service when fetching with all houses', convertedHouses);
        return convertedHouses;
    } catch (err) {
        console.log(err);
        throw new Error('Error while fetching houses');
    }
}

const getHousesForRent = async ( ): Promise<housesForRentInterface[]> => {
   try {
    const houses = await HouseForRent.find();
    const convertedHousesForRent = houses.map(house => ({
        _id: house._id.toString(),
        title: house.title,
        description: house.description,
        address: house.address,
        location: house.location,
        monthlyRent: house.monthlyRent,
        rentalDeposit: house.rentalDeposit,
        imageUrl: house.imageUrl,
        bathrooms: house.bathrooms,
        bedrooms: house.bedrooms,
        agent: house.agent,
        addedBy: house.addedBy?.toString()
    }));
    console.log('houses from house service when fetching with all houses for RENT', convertedHousesForRent);
    return convertedHousesForRent as housesForRentInterface[];

   } catch (err) {
         console.log(err);
         throw new Error('Error while fetching houses');
    }
}

const getHouseById = (id: string) => {
    const house = housesForSale.find((house) => house._id === id);
    return house;
}

const getHouseForRentById = (id: string) => {
    const house = housesForRent.find((house) => house._id === id);
    return house;
}

const createHouseForSale = async (
    houseForSaleData: HouseInterface,
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    const { _id, title, description, address, location , price, imageUrl, bathrooms, bedrooms, agent , addedBy } = houseForSaleData;
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
            agent,
            addedBy
        });
        await newHouseForSale.save();
        res.status(201).json({ message: 'House created successfully' });
    } catch (error) {
        next(error);
    }
}


const createHouseForRent = async (
    houseForRentData: housesForRentInterface,
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
    const { _id, title, description, address, location , monthlyRent, rentalDeposit, imageUrl, bathrooms, bedrooms, agent, addedBy } = houseForRentData;
    try {
        const newHouseForRent = new HouseForRent({
            _id,
            title,
            description,
            address,
            location,
            monthlyRent,
            rentalDeposit,
            imageUrl,
            bathrooms,
            bedrooms,
            agent,
            addedBy
        });
        await newHouseForRent.save();
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
    createHouseForSale,
    createHouseForRent
}
