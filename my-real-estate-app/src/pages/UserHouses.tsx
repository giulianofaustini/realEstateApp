import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { HouseProps } from "../App";
import { HousesForRentProps } from "../App";
import { useSelector } from "react-redux";
import { UserState } from "../redux/user/userSlice";

export const UserHouses = () => {
  const { userId } = useParams();
  const [houses, setHouses] = useState<HouseProps[]>([]);
  const [housesForRent, setHousesForRent] = useState<HousesForRentProps[]>([]);

  console.log("ID from the user houses USEPARAMS component", userId);

  const { currentUser } = useSelector((state: { user: UserState }) => ({
    currentUser: state.user.currentUser,
  }));

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

  const handleDeleteHouseForSaleFromUsersList = async (houseId: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this listing?");
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/api/delete-house-for-sale/${houseId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
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
    const isConfirmed = window.confirm("Are you sure you want to delete this listing?");
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/api/delete-house-for-rent/${houseId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setHousesForRent((prev) => prev.filter((house) => house._id !== houseId));
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
  }
  
  return (
    <div className="grid grid-cols-3 justify-center ">
      {selectedUserHousesForSale &&
        selectedUserHousesForSale.map((house) => (
          <div
            className=" bg-slate-100 p-6 border-2 rounded-xl border-slate-200  m-2 "
            key={house._id}
          >
            <div>{house.title}</div>
            <div>{house.description}</div>
            {house.userId === currentUser?._id ? (
              <div className="flex justify-between mt-5 px-5">
                <button className="uppercase text-yellow-500">edit</button>
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

      <div className="grid grid-cols-3 justify-center ">
        {selectedUserHousesForRent &&
          selectedUserHousesForRent.map((house) => (
            <div
              className=" bg-slate-100 p-6 border-2 rounded-xl border-slate-200  m-2 "
              key={house._id}
            >
              <div>{house.title}</div>
              <div>{house.description}</div>
              {house.userId === currentUser?._id ? (
                <div className="flex justify-between mt-5 px-5">
                  <button className="uppercase text-yellow-500">edit</button>
                  <button onClick={() => handleDeleteHouseForRentFromUsersList(house._id)} className="uppercase text-red-600 ">delete</button>
                </div>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
};
