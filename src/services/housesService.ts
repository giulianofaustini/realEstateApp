


import { houses } from "../data/housesData";

const getHouses = ( ) => {
    return houses;
}

const getHouseById = (id: string) => {
    const house = houses.find((house) => house.id === id);
    return house;
}


export const housesService = {
    getHouses,
    getHouseById,
}