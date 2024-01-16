import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { HouseProps } from "../App";
import { HousesForRentProps } from "../App";

export const UserHouses = () => {
  const { userId } = useParams();
  const [houses, setHouses] = useState<HouseProps[]>([]);
  const [housesForRent, setHousesForRent] = useState<HousesForRentProps[]>([]);

  console.log("ID from the user houses USEPARAMS component", userId );

  const fetchHouses = async () => {
    const response = await fetch("http://localhost:3000/api/housesForSale");
    const data = await response.json();
    setHouses(data);
  };

  const fetchHousesForRent = async () => {
    const response = await fetch("http://localhost:3000/api/housesForRent");
    const data = await response.json();
    setHousesForRent(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchHouses(), fetchHousesForRent()]);
    };

    fetchData();
  }, []);

  // console.log("houses SALE from the user houses component", houses);
  // console.log("houses RENT from the user houses component", housesForRent);

  const selectedUserHousesForSale =
    houses &&
    houses.filter((house) => {
      console.log("House userID", house.userId);
      console.log("Is it a match?", house.userId === userId);
      return house.userId === userId;
    });

  console.log(
    "selected user houses SALE from the user houses component",
    selectedUserHousesForSale
  );

  const selectedUserHousesForRent =
    housesForRent &&
    housesForRent.filter((house) => {
      console.log("House userID", house.userId);
      console.log("Is it a match?", house.userEmail === userId);
      return house.userId === userId;
    });

  console.log(
    "selected user houses RENT from the user houses component",
    selectedUserHousesForRent
  );

  return (
    <div>
      <div>HOuses for sale</div>
      {selectedUserHousesForSale &&
        selectedUserHousesForSale.map((house) => (
          <div key={house._id}>
            <div>{house.title}</div>
            <div>{house.description}</div>
            <div>{house.price}</div>
          </div>
        ))}
      <div>
        Houses for rent
        {selectedUserHousesForRent &&
          selectedUserHousesForRent.map((house) => (
            <div key={house._id}>
              <div>{house.title}</div>
              <div>{house.description}</div>
              <div>{house.monthlyRent}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
