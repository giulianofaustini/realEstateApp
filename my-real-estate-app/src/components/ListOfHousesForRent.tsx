import { Link } from "react-router-dom";
import { housesForRentInterface } from "../App"; // Assuming housesForRentInterface is correctly imported

export interface ListOfHousesForRentProps {
  housesToRent: housesForRentInterface[];
}

export const ListOfHousesForRent = ({ housesToRent }: ListOfHousesForRentProps) => {

  console.log("from List Of Houses For Rent component", housesToRent);
  return (
    <div >
      {housesToRent.map((house) => (
        <div key={house.id}>
          <Link to={`/api/housesForRent/rent/${house.id}`}>
            <div>{house.title}</div>
            <div>{house.description}</div>
            <div>{house.monthlyRent}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};
