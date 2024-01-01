import { Link } from "react-router-dom";
import { housesForRentInterface } from "../App"; // Assuming housesForRentInterface is correctly imported

export interface ListOfHousesForRentProps {
  housesToRent: housesForRentInterface[];
}

export const ListOfHousesForRent = ({ housesToRent }: ListOfHousesForRentProps) => {

  console.log("from List Of Houses For Rent component", housesToRent);
  return (
    <div  className="grid grid-cols-3 justify-center">
      {housesToRent.map((house) => (
        <div key={house.id} >
          <Link  key={house.id} to={`/api/housesForRent/rent/${house.id}`}>
            <div className=" bg-slate-100 p-6 border-2 border-slate-200  m-2 rounded-xl">
            <div className="font-bold " >{house.title}</div>
            <div>{house.description}</div>
            <div>{house.monthlyRent}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
