import { housesForSale } from "../data/housesData";
import { housesForRent } from "../data/housesForRentData";
import { NextFunction } from "express";
import { HouseInterface } from "../interfaces/houseInterface";
import { Request, Response } from "express";
import HouseForSale from "../models/houseForSale.model";
import { housesForRentInterface } from "../interfaces/housesForRentInterface";
import HouseForRent from "../models/HouseForRentModel";
import User from "../models/user.model";

const getHouses = async (): Promise<HouseInterface[]> => {
  try {
    const houses = await HouseForSale.find();
    const convertedHouses = houses.map((house) => ({
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
      addedBy: house.addedBy?.toString(),
      userEmail: house.userEmail?.toString(),
      userId: house.userId?.toString(),
      status: house.status,
    }));
    console.log(
      "houses from house service when fetching with all houses",
      convertedHouses
    );
    return convertedHouses as HouseInterface[];
  } catch (err) {
    console.log(err);
    throw new Error("Error while fetching houses");
  }
};

const getHousesForRent = async (): Promise<housesForRentInterface[]> => {
  try {
    const houses = await HouseForRent.find();
    const convertedHousesForRent = houses.map((house) => ({
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
      addedBy: house.addedBy?.toString(),
      userEmail: house.userEmail?.toString(),
      userId: house.userId?.toString(),
    }));
    console.log(
      "houses from house service when fetching with all houses for RENT",
      convertedHousesForRent
    );
    return convertedHousesForRent as housesForRentInterface[];
  } catch (err) {
    console.log(err);
    throw new Error("Error while fetching houses");
  }
};

const getHouseById =  async (id: string) => {
  try {
    const house = await HouseForSale.findById(id)
    const convertedHouse: HouseInterface = {
      _id: house?._id.toString(),
      title: house?.title || "",
      description: house?.description || "",
      address: house?.address || "",
      location: house?.location || "",
      price: house?.price || 0,
      imageUrl: house?.imageUrl || [],
      bathrooms: house?.bathrooms || 0,
      bedrooms: house?.bedrooms || 0,
      agent: house?.agent || "",
      addedBy: house?.addedBy?.toString(),
      userEmail: house?.userEmail?.toString(),
      userId: house?.userId?.toString(),
      status: house?.status || "",
    };
    return convertedHouse;
  } catch (error) {
    throw new Error("Error while fetching house");
    }
  
};

const getHouseForRentById = async (id: string) => {
  try {
    const house = await HouseForRent.findById(id)
    const convertedHouse: housesForRentInterface = {
      _id: house?._id.toString(),
      title: house?.title || "",
      description: house?.description || "",
      address: house?.address || "",
      location: house?.location || "",
      monthlyRent: house?.monthlyRent || 0,
      rentalDeposit: house?.rentalDeposit || 0,
      imageUrl: house?.imageUrl || [],
      bathrooms: house?.bathrooms || 0,
      bedrooms: house?.bedrooms || 0,
      agent: house?.agent || "",
      addedBy: house?.addedBy?.toString(),
      userEmail: house?.userEmail?.toString(),
      userId: house?.userId?.toString(),
    };
    return convertedHouse;

  } catch (error) {
    throw new Error("Error while fetching house");
    }
 

  
};

const createHouseForSale = async (
  houseForSaleData: HouseInterface,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
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
    addedBy,
    userEmail,
    userId,
  } = houseForSaleData;
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
      addedBy,
      userEmail,
      userId,
    });
    await newHouseForSale.save();
    res.status(201).json({ message: "House created successfully" });
  } catch (error) {
    next(error);
  }
};

const createHouseForRent = async (
  houseForRentData: housesForRentInterface,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
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
    addedBy,
    userEmail,
    userId,
  } = houseForRentData;
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
      addedBy,
      userEmail,
      userId,
    });
    await newHouseForRent.save();
    res.status(201).json({ message: "House created successfully" });
  } catch (error) {
    next(error);
  }
};


const deleteHouseForSale = async (_id: string): Promise<HouseInterface | null> => {
    try {
        const houseToDelete = await HouseForSale.findById(_id);

        if (houseToDelete) {
            const convertedHouse: HouseInterface = {
              _id: houseToDelete._id.toString(),
              title: houseToDelete.title,
              description: houseToDelete.description,
              address: houseToDelete.address,
              location: houseToDelete.location || undefined,
              price: houseToDelete.price,
              imageUrl: houseToDelete.imageUrl,
              bathrooms: houseToDelete.bathrooms,
              bedrooms: houseToDelete.bedrooms,
              agent: houseToDelete.agent,
              addedBy: houseToDelete.addedBy?.toString(),
              userEmail: houseToDelete.userEmail?.toString(),
              userId: houseToDelete.userId?.toString(),
              status: houseToDelete.status,
            };

        await HouseForSale.findByIdAndDelete(_id);
            return convertedHouse;
           
        } else {
            return null;
        }
    } catch (error) {
        throw new Error("Error while deleting house");
    }
};

const deleteHouseForRent = async (_id: string): Promise<housesForRentInterface | null> => {
    try {
        const houseToDelete = await HouseForRent.findById(_id);

        if (houseToDelete) {
            const convertedHouse: housesForRentInterface = {
                _id: houseToDelete._id.toString(),
                title: houseToDelete.title,
                description: houseToDelete.description,
                address: houseToDelete.address,
                location: houseToDelete.location || undefined,
                monthlyRent: houseToDelete.monthlyRent,
                rentalDeposit: houseToDelete.rentalDeposit,
                imageUrl: houseToDelete.imageUrl,
                bathrooms: houseToDelete.bathrooms,
                bedrooms: houseToDelete.bedrooms,
                agent: houseToDelete.agent,
                addedBy: houseToDelete.addedBy?.toString(),
                userEmail: houseToDelete.userEmail?.toString(),
                userId: houseToDelete.userId?.toString(),
            };

        await HouseForRent.findByIdAndDelete(_id);
            return convertedHouse;
           
        } else {
            return null;
        }
    } catch (error) {
        throw new Error("Error while deleting house");
    }
}


const updateHouseForSale = async (_id: string, houseForSaleData: HouseInterface): Promise<HouseInterface | null> => {
    try {
        const houseToUpdate = await HouseForSale.findById(_id);

        if (houseToUpdate) {
            const convertedHouse: HouseInterface = {
                _id: houseToUpdate._id.toString(),
                title: houseToUpdate.title,
                description: houseToUpdate.description,
                address: houseToUpdate.address,
                location: houseToUpdate.location || undefined,
                price: houseToUpdate.price,
                imageUrl: houseToUpdate.imageUrl,
                bathrooms: houseToUpdate.bathrooms,
                bedrooms: houseToUpdate.bedrooms,
                agent: houseToUpdate.agent,
                addedBy: houseToUpdate.addedBy?.toString(),
                userEmail: houseToUpdate.userEmail?.toString(),
                userId: houseToUpdate.userId?.toString(),
                status: houseToUpdate.status,
            };

            await HouseForSale.findByIdAndUpdate(_id, houseForSaleData);
            return convertedHouse;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error("Error while updating house");
    }

}


const updateHouseForRent = async (_id: string, houseForRentData: housesForRentInterface): Promise<housesForRentInterface | null> => {
    try {
        const houseToUpdate = await HouseForRent.findById(_id);

        if (houseToUpdate) {
            const convertedHouse: housesForRentInterface = {
                _id: houseToUpdate._id.toString(),
                title: houseToUpdate.title,
                description: houseToUpdate.description,
                address: houseToUpdate.address,
                location: houseToUpdate.location || undefined,
                monthlyRent: houseToUpdate.monthlyRent,
                rentalDeposit: houseToUpdate.rentalDeposit,
                imageUrl: houseToUpdate.imageUrl,
                bathrooms: houseToUpdate.bathrooms,
                bedrooms: houseToUpdate.bedrooms,
                agent: houseToUpdate.agent,
                addedBy: houseToUpdate.addedBy?.toString(),
                userEmail: houseToUpdate.userEmail?.toString(),
                userId: houseToUpdate.userId?.toString(),
            };

            await HouseForRent.findByIdAndUpdate(_id, houseForRentData);
            return convertedHouse;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error("Error while updating house");
    }

}

export const housesService = {
  getHouses,
  getHouseById,
  getHousesForRent,
  getHouseForRentById,
  createHouseForSale,
  createHouseForRent,
  deleteHouseForSale,
  deleteHouseForRent,
  updateHouseForSale,
  updateHouseForRent
};
