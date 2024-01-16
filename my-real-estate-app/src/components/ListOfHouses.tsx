import { useEffect } from "react";
import { HouseProps } from "../App";
import { Link, useNavigate } from "react-router-dom";

export interface ListOfHousesProps {
  housesToPass: HouseProps[];
  setHouses: React.Dispatch<React.SetStateAction<HouseProps[]>>;
}

export const ListOfHouses = ({ housesToPass , setHouses }: ListOfHousesProps) => {
  console.log("from List Of Houses component", housesToPass);


  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("http://localhost:3000/api/housesForSale");
      const data = await response.json();
      console.log("data from the fetchHouses", data);
      setHouses(data);
    }
    fetchHouses();
  } , [setHouses]);
  



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
                    <img className="w-full h-40 object-cover" src={house.imageUrl[0]} alt="listing first image" />
                    <div className="font-bold ">{house.title}</div>
                    <div>{house.description}</div>
                    <div>{house.price} € </div>
                    { house &&  house.addedBy ? (
                      <>
                      <Link to={`/api/userHouses/${house.userId}`} >
                    <div className="capitalize">Added by: {house.addedBy}.UserId: {house.userId}  </div> 
                    </Link>
                    <div> Contact info: {house.userEmail}. </div> 
                    </>
                    ) : null }
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
