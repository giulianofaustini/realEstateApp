import { HouseProps } from "../App";
import { Link, useNavigate } from "react-router-dom";




export interface ListOfHousesProps {
  housesToPass: HouseProps[];
}

export const ListOfHouses = ({ housesToPass }: ListOfHousesProps) => {
  console.log("from List Of Houses component", housesToPass);

  const navigate = useNavigate();

  return (
    <>
     
      
      <div>
        {housesToPass.map((house) => (
          console.log('in the map the id:', house.id),
          <div key={house.id}>
            <Link to={`/api/houses/${house.id}`}>
               <div>{house.title}</div>
               <div>{house.description}</div>
            </Link>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/")}>home</button>
    </>
  );
};
