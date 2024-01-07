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
      <div className="grid grid-cols-3 justify-center ">
        {housesToPass.map(
          (house) => (
            console.log("in the map the id:", house._id),
            (
              <div  key={house._id}>
                <Link to={`/api/houses/sale/${house._id}`}>
                  <div className=" bg-slate-100 p-6 border-2 rounded-xl border-slate-200  m-2 ">
                    <div className="font-bold ">{house.title}</div>
                    <div>{house.description}</div>
                    <div>{house.price}</div>
                  </div>
                </Link>
              </div>
            )
          )
        )}
      </div>
      <button onClick={() => navigate("/")}>home</button>
    </>
  );
};
