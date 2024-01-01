


import { housesForSale } from "../data/housesData";
import { housesForRent } from "../data/housesForRentData";

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


export const housesService = {
    getHouses,
    getHouseById,
    getHousesForRent,
}