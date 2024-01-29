import { useEffect } from "react";
import { HouseProps } from "../App";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoMdSquareOutline } from "react-icons/io";
import React from "react";

export interface ListOfHousesProps {
  housesToPass: HouseProps[];
  setHouses: React.Dispatch<React.SetStateAction<HouseProps[]>>;
  selectedStatus: { value: string; label: string } | null;
}

export const ListOfHouses = ({
  housesToPass,
  setHouses,
  selectedStatus,
}: ListOfHousesProps) => {
  console.log("from List Of Houses component", housesToPass);

  const [filteredHouses, setFilteredHouses] = useState<HouseProps[]>([]);

  console.log("filteredHouses ONSALE", filteredHouses);

  const backendURL =
    process.env.NODE_ENV === "production"
      ? "https://sharestateback.onrender.com"
      : "http://localhost:3000";

  useEffect(() => {
    if (selectedStatus) {
      const filtered = housesToPass.filter(
        (house) => house.status === selectedStatus.value
      );
      setFilteredHouses(filtered);
    } else {
      setFilteredHouses(housesToPass);
    }
  }, [housesToPass, selectedStatus]);

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch(`${backendURL}/api/housesForSale`);
      const data = await response.json();
      setHouses(data);
    };
    fetchHouses();
  }, [backendURL, setHouses]);

  return (
    <>
      <div className="grid grid-cols-3 mx-auto md:flex md:items-center text-sm gap-2 md:flex-wrap md:w-4/5 md:mx-auto uppercase mb-4">
        <IoMdSquareOutline className=" hidden md:inline text-green-500 h-4 bg-green-500" />
        <span className="ml-2 md:mr-6 text-green-500 "> available </span>
        <IoMdSquareOutline className="hidden md:inline text-yellow-300 h-4 bg-yellow-300" />
        <span className="md:mr-6 text-yellow-300">
          {" "}
          reserved.{" "}
          <span className="hidden md:inline">
            {" "}
            Check back for status changes
          </span>{" "}
        </span>
        <IoMdSquareOutline className=" hidden md:inline text-red-500 h-4 bg-red-500" />
        <span className="text-red-500"> Sold / to be removed</span>
      </div>
      <div className=" h-full  ">
        <div className="grid grid-cols-1 md:grid-cols-2  mx-auto w-4/5 justify-self-center ">
          {housesToPass.map((house) => (
            // console.log("in the map the id:", house._id),
            <div className="   " key={house._id}>
              <Link key={house._id} to={`/api/houses/sale/${house._id}`}>
                <div className=" bg-cyan-900 p-1 border-2 rounded-xl border-white  m-2  text-white ">
                  <div
                    className={`p-4 border-4 rounded-xl m-2 ${
                      house.status === "onHold"
                        ? "border-yellow-300"
                        : house.status === "sold"
                        ? "border-red-500"
                        : house.status === "onSale"
                        ? "border-green-500"
                        : ""
                    }`}
                  >
                    <img
                      className="w-full h-40 object-cover"
                      src={house.imageUrl[0]}
                      alt="listing first image"
                    />
                    <div className="font-bold pb-1 ">{house.title}</div>
                    <div>{house.description}</div>
                    <div>{house.price} € </div>
                    {house && house.addedBy ? (
                      <>
                        <Link to={`/api/userHouses/${house.userId}`}>
                          <div className="capitalize">
                            Added by:{" "}
                            <span className="text-green-600 hover:bg-green-100 ring-rounded-xl p-2 rounded-lg ">
                              {house.addedBy}
                            </span>{" "}
                          </div>
                        </Link>
                      </>
                    ) : null}
                    <div className="text-center"> {house.address}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
