
import { useState, useEffect } from "react";
import { ListOfHouses } from "./components/ListOfHouses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { SingleHouse } from "./components/SingleHouse";
import { SignIn } from "./pages/SignIn";
import { ListOfHousesForRent } from "./components/ListOfHousesForRent";
import { SingleHouseForRent } from "./components/SingleHouseForRent";
import { SignUp } from "./pages/SignUp";
import { ActionPage } from "./pages/ActionPage";
import { HouseForSaleForm } from "../src/pages/HouseForSaleForm";
import { HouseForRentForm } from "../src/pages/HouseForRentForm";


export interface HouseProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  imageUrl: string;
  agent: string;
  bedrooms: number;
  bathrooms: number;
  addedBy: string;
}

export interface HousesForRentProps {
_id: string;
title: string;
description: string;
monthlyRent: number;
rentalDeposit: number;
address: string;
location: string;
imageUrl: string;
agent: string;
bedrooms: number;
bathrooms: number;
addedBy: string;
}


function App() {
  const [houses, setHouses] = useState<HouseProps[]>([]);
  const [housesForRent , setHousesForRent] = useState<HousesForRentProps[]>([]);
  const [loading, setLoading] = useState(true);

  

 
    const fetchHouses = async () => {
      const response = await fetch("http://localhost:3000/api/housesForSale");
      const data = await response.json();
      setHouses(data);
      setLoading(false);
    };
  useEffect(() => {
    fetchHouses();
  } , []);
  
 
    const fetchHousesForRent = async () => {
      const response = await fetch("http://localhost:3000/api/housesForRent");
      const data = await response.json();
      setHousesForRent(data);
      setLoading(false);
    };
  useEffect(() => {
    fetchHousesForRent();
  }, []);


  if (loading) {
    return <div>loading...</div>;
  }

  console.log(houses);
  console.log(housesForRent);

  return (
    <>
    <div  >
      <Router >
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/houses/sale/:id" element={<SingleHouse houses={houses} />} />
          <Route path="/api/housesForSale" element={<ListOfHouses housesToPass={houses}  setHouses={setHouses}/>} />
          <Route path="/api/housesForRent" element={<ListOfHousesForRent housesToRent={housesForRent} setHousesForRent={setHousesForRent} />} />
          <Route path="/api/housesForRent/rent/:id" element={<SingleHouseForRent houseToRent={housesForRent} />} />
          <Route path="/api/sign-in" element={<SignIn />} />
          <Route path="/api/sign-up" element={<SignUp />} />
          <Route path="/api/action" element={<ActionPage />} />
          <Route path="/api/create-house-for-sale" element={<HouseForSaleForm />} />
          <Route path="/api/create-house-for-rent" element={<HouseForRentForm />} />
          
        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;
