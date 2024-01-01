
import { useState, useEffect } from "react";
import { ListOfHouses } from "./components/ListOfHouses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { SingleHouse } from "./components/SingleHouse";
import { SignIn } from "./pages/SignIn";
import { ListOfHousesForRent } from "./components/ListOfHousesForRent";

export interface HouseProps {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  imageUrl: string;
  agent: string;
  bedrooms: number;
  bathrooms: number;
}

export interface housesForRentInterface {
  id: string;
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
}


function App() {
  const [houses, setHouses] = useState<HouseProps[]>([]);
  const [housesForRent , setHousesForRent] = useState<housesForRentInterface[]>([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("http://localhost:3000/api/housesForSale");
      const data = await response.json();
      setHouses(data);
      setLoading(false);
    };
    fetchHouses();
  }, []);

  useEffect(() => {
    const fetchHousesForRent = async () => {
      const response = await fetch("http://localhost:3000/api/housesForRent");
      const data = await response.json();
      setHousesForRent(data);
      setLoading(false);
    };
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
          <Route path="/api/houses/:id" element={<SingleHouse houses={houses} />} />
          <Route path="/api/housesForSale" element={<ListOfHouses housesToPass={houses} />} />
          <Route path="/api/housesForRent" element={<ListOfHousesForRent housesToRent={housesForRent} />} />
          <Route path="/api/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;
