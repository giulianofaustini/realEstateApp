import { useEffect } from "react";
import { HouseProps } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export interface ListOfHousesProps {
  housesToPass: HouseProps[];
  setHouses: React.Dispatch<React.SetStateAction<HouseProps[]>>;
  selectedStatus: { value: string; label: string } | null;
}

export const ListOfHouses = ({ housesToPass , setHouses , selectedStatus }: ListOfHousesProps) => {
  console.log("from List Of Houses component", housesToPass);

  const [filteredHouses, setFilteredHouses] = useState<HouseProps[]>([]);

  console.log("filteredHouses ONSALE", filteredHouses);


  useEffect(() => {
    
    if (selectedStatus) {
      const filtered = housesToPass.filter((house) => house.status === selectedStatus.value);
      setFilteredHouses(filtered);
    } else {
      setFilteredHouses(housesToPass);
    }
  }, [housesToPass, selectedStatus]);

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
    <div className= " h-full  ">
    
      <div className="grid grid-cols-2 mx-auto w-4/5 justify-self-center">
        {housesToPass.map((house) => (
            // console.log("in the map the id:", house._id),
            (
              <div className="   " key={house._id}>
                <Link key={house._id} to={`/api/houses/sale/${house._id}`}>
                  <div className=" bg-slate-100 p-1 border-2 rounded-xl border-slate-200  m-2  ">
                  <div
                className={`p-4 border-4 rounded-xl m-2 ${
                  house.status === "onHold"
                    ? "border-yellow-500"
                    : house.status === "sold"
                    ? "border-red-500"
                    : house.status === "onSale"
                    ? "border-green-500"
                    : ""
                }`}
              >
                    <img className="w-full h-40 object-cover" src={house.imageUrl[0]} alt="listing first image" />
                    <div className="font-bold ">{house.title}</div>
                    <div>{house.description}</div>
                    <div>{house.price} € </div>
                    { house &&  house.addedBy ? (
                      <>
                      <Link to={`/api/userHouses/${house.userId}`} >
                    <div className="capitalize">Added by: <span className="text-green-600 hover:bg-green-100 ring-rounded-xl p-2 rounded-lg ">{house.addedBy}</span> </div> 
                    </Link>
                    </>
                    ) : null }
                  </div>
                  </div>
                </Link>

              
              </div>
            )
          )
        )}
      </div>
      
      <button onClick={() => navigate("/")}>home</button>
    </div>
  );
};
