import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { HouseProps } from "../App";
import { HousesForRentProps } from "../App";
import { useSelector } from "react-redux";
import { UserState } from "../redux/user/userSlice";
import React from "react";

export const UserHouses = () => {
  const { userId } = useParams();
  const [houses, setHouses] = useState<HouseProps[]>([]);
  const [housesForRent, setHousesForRent] = useState<HousesForRentProps[]>([]);

  console.log("ID from the user houses USEPARAMS component", userId);

  const { currentUser } = useSelector((state: { user: UserState }) => ({
    currentUser: state.user.currentUser,
  }));

  const backendURL =
    process.env.NODE_ENV === "production"
      ? "https://sharestateback.onrender.com"
      : "http://localhost:3000";

  const fetchHouses = async () => {
    const response = await fetch(`${backendURL}/api/housesForSale`);
    const data = await response.json();
    setHouses(data);
  };

  const fetchHousesForRent = async () => {
    const response = await fetch(`${backendURL}/api/housesForRent`);
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

  const handleDeleteHouseForSaleFromUsersList = async (houseId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (isConfirmed) {
      try {
        const response = await fetch(
          `${backendURL}/api/delete-house-for-sale/${houseId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setHouses((prev) => prev.filter((house) => house._id !== houseId));

          console.log("data", data);
        } else {
          console.log("Error deleting house:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Deletion canceled by the user.");
    }
  };

  const handleDeleteHouseForRentFromUsersList = async (houseId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (isConfirmed) {
      try {
        const response = await fetch(
          `${backendURL}/api/delete-house-for-rent/${houseId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setHousesForRent((prev) =>
            prev.filter((house) => house._id !== houseId)
          );
          console.log("data", data);
        } else {
          console.log("Error deleting house:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Deletion canceled by the user.");
    }
  };

  return (
    <div className=" md:w-3/5 mx-auto ">
      <div className="text-center uppercase mt-20 mb-8 font-bold hover:font-extrabold text-2xl ">
        on sale - Added by:{" "}
        {selectedUserHousesForSale.length > 0 &&
          selectedUserHousesForSale[0].addedBy}
      </div>
      <div className="md:grid md:grid-cols-2 justify-center max-w-85 ">
        {selectedUserHousesForSale &&
          selectedUserHousesForSale.map((house) => (
            <div
              className=" bg-cyan-900 text-white p-6 border-2 rounded-xl border-white  m-2 "
              key={house._id}
            >
              <div className="font-bold pb-1">{house.title}</div>
              <div>{house.description}</div>
              {house.userId === currentUser?._id ? (
                <div className="flex justify-between mt-5 px-5">
                  <Link to={`/api/update-house-for-sale/${house._id}`}>
                    <button className="uppercase text-yellow-500">edit</button>
                  </Link>
                  <button
                    onClick={() =>
                      handleDeleteHouseForSaleFromUsersList(house._id)
                    }
                    className="uppercase text-red-600 "
                  >
                    delete
                  </button>
                </div>
              ) : null}
            </div>
          ))}
      </div>
      <div className="text-center uppercase mt-10 mb-8 font-bold hover:font-extrabold text-2xl ">
        {" "}
        for rent - Added by:{" "}
        {selectedUserHousesForRent.length > 0 &&
          selectedUserHousesForRent[0].addedBy}{" "}
      </div>
      <div className="md:grid md:grid-cols-2 md:justify-center  ">
        {selectedUserHousesForRent &&
          selectedUserHousesForRent.map((house) => (
            <div
              className=" bg-cyan-900 text-white p-6 border-2 rounded-xl border-white  m-2 "
              key={house._id}
            >
              <div className="font-bold pb-1 ">{house.title}</div>
              <div>{house.description}</div>
              {house.userId === currentUser?._id ? (
                <div className="flex justify-between mt-5 px-5">
                  <Link to={`/api/update-house-for-rent/${house._id}`}>
                    <button className="uppercase text-yellow-500">edit</button>
                  </Link>
                  <button
                    onClick={() =>
                      handleDeleteHouseForRentFromUsersList(house._id)
                    }
                    className="uppercase text-red-600 "
                  >
                    delete
                  </button>
                </div>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
};
