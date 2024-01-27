import { Link } from "react-router-dom";
import { HousesForRentProps } from "../App";
import { useEffect } from "react";
import { useState } from "react";
import { IoMdSquareOutline } from "react-icons/io";
import React from "react";

export interface ListOfHousesForRentProps {
  housesToRent: HousesForRentProps[];
  setHousesForRent: React.Dispatch<React.SetStateAction<HousesForRentProps[]>>;
  selectedStatusRent: { value: string; label: string };
}

export const ListOfHousesForRent = ({
  housesToRent,
  setHousesForRent,
  selectedStatusRent,
}: ListOfHousesForRentProps) => {
  const [filteredHouses, setFilteredHouses] = useState<HousesForRentProps[]>(
    housesToRent
  );

  console.log("filteredHouses FOR RENT", filteredHouses);

  const backendUrl = 'https://sharestateback.onrender.com' || 'http://localhost:3000';

  useEffect(() => {
    
    if (selectedStatusRent && selectedStatusRent.value) {
      const filtered = housesToRent.filter((house) => house.status === selectedStatusRent.value);
      setFilteredHouses(filtered);
    } else {
      setFilteredHouses(housesToRent);
    }
  }, [housesToRent, selectedStatusRent]);

  useEffect(() => {
    const fetchHousesForRent = async () => {
      const response = await fetch(`${backendUrl}/api/housesForRent`);
      const data = await response.json();
      console.log("data from the fetchHousesForRent", data);
      setHousesForRent(data);
    };
    fetchHousesForRent();
  }, [setHousesForRent]);

  console.log("from List Of Houses For Rent component", housesToRent);
  return (

    <>
    <div className="grid grid-cols-3 mx-auto md:flex md:items-center gap-2 md:flex-wrap md:w-4/5 md:mx-auto uppercase mb-4">
    <IoMdSquareOutline  className="hidden md:inline text-green-500 h-4 bg-green-500" />
      <span className="ml-2 md:mr-6 text-green-500 ">available</span>
    <IoMdSquareOutline className="hidden md:inline text-yellow-300 h-4 bg-yellow-300" />
      <span className="mr-6 text-yellow-300">reserved.  <span className="hidden md:inline"> Check back for status changes</span> </span>
    <IoMdSquareOutline className="hidden md:inline text-red-500 h-4 bg-red-500" />
      <span className="text-red-500"> rented out/ to be removed</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 w-4/5 mx-auto justify-center">
      {housesToRent.map((house) => (
        <div key={house._id}>
          <Link key={house._id} to={`/api/housesForRent/rent/${house._id}`}>
            <div className=" bg-cyan-900 p-1 border-2 border-slate-200  m-2 rounded-xl text-white">
              <div
                className={`p-4 border-4 rounded-xl m-2 ${house.status === "onHold"
                    ? "border-yellow-300"
                    : house.status === "sold"
                      ? "border-red-500"
                      : house.status === "onSale"
                        ? "border-green-500"
                        : ""}`}
              >
                <img
                  className="w-full h-40 object-cover"
                  src={house.imageUrl[0]}
                  alt="house for rent" />

                <div className="font-bold pb-1 ">{house.title}</div>
                <div>{house.description}</div>
                <div>{house.monthlyRent} € </div>
                {house.addedBy ? (
                  <Link to={`/api/userHouses/${house.userId}`}>
                    <div className="capitalize">
                      Added by{" "}
                      <span className="text-green-600 hover:bg-green-100 ring-rounded-xl p-3 rounded-lg">
                        {house.addedBy}{" "}
                      </span>{" "}
                      <div className="text-center"> {house.address}</div>
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div></>
  );
};
