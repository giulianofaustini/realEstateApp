import { Link } from "react-router-dom";
import { HousesForRentProps } from "../App";
import { useEffect } from "react";

export interface ListOfHousesForRentProps {
  housesToRent: HousesForRentProps[];

  setHousesForRent: React.Dispatch<React.SetStateAction<HousesForRentProps[]>>;
}

export const ListOfHousesForRent = ({
  housesToRent,
  setHousesForRent,
}: ListOfHousesForRentProps) => {
  useEffect(() => {
    const fetchHousesForRent = async () => {
      const response = await fetch("http://localhost:3000/api/housesForRent");
      const data = await response.json();
      console.log("data from the fetchHousesForRent", data);
      setHousesForRent(data);
    };
    fetchHousesForRent();
  }, [setHousesForRent]);

  console.log("from List Of Houses For Rent component", housesToRent);
  return (
    <div className="grid grid-cols-3 justify-center">
      {housesToRent.map((house) => (
        <div key={house._id}>
          <Link key={house._id} to={`/api/housesForRent/rent/${house._id}`}>
          <div className=" bg-slate-100 p-6 border-2 border-slate-200  m-2 rounded-xl">
              <img
                className="w-full h-40 object-cover"
                src={house.imageUrl[0]}
                alt="house for rent"
              />


            
              <div className="font-bold ">{house.title}</div>
              <div>{house.description}</div>
              <div>{house.monthlyRent} € </div>
              {house.addedBy ? (
               <Link to={`/api/userHouses/${house.userId}`} >
                <div className="capitalize">Added by  <span className="text-green-600 hover:bg-green-100 ring-rounded-xl p-3 rounded-lg" >{house.addedBy} </span>  </div>
                </Link>
              ) : null}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
