
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
import { PrivateComponent } from "./components/PrivateComponent";
import { UserHouses } from "../src/pages/UserHouses"
import { UpdateHouseForRentForm } from "./pages/UpdateHouseForRentForm";
import { UpdateHouseForSaleForm } from "./pages/UpdateHouseForSaleForm";
import { Map } from "../src/components/Map"
import { MapSale } from "./components/MapSale";


export interface HouseProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  location?: string;
  imageUrl: string[];
  year: number;
  bedrooms: number;
  bathrooms: number;
  addedBy: string;
  userEmail?: string;
  userId?: string;
  status: string;
}

export interface HousesForRentProps {
_id: string;
title: string;
description: string;
monthlyRent: number;
rentalDeposit: number;
address: string;
location?: string;
imageUrl: string[];
agent: string;
bedrooms: number;
bathrooms: number;
addedBy: string;
userEmail?: string;
userId?: string;
status: string;
}


function App() {
  const [houses, setHouses] = useState<HouseProps[]>([]);
  const [housesForRent , setHousesForRent] = useState<HousesForRentProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedStatusRent, setSelectedStatusRent] = useState<string | null>(null);

  const handleFormSubmission = (status: string) => {
    setSelectedStatus(status);
  };

  const handleFormSubmissionRent = (status: string) => {
    setSelectedStatusRent(status);
  };




 
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
          <Route path="/api/rentInYourArea" element={<Map houseToRentInMap={housesForRent}  selectedStatusRent={selectedStatusRent ? { value: selectedStatusRent, label: selectedStatusRent} : { value: "", label: "" } } />} />
          <Route path="/api/buyInYourArea" element={<MapSale houseToBuyInMap={houses} selectedStatus={selectedStatus ? { value: selectedStatus, label: selectedStatus } : null} />} />
          <Route path="/api/houses/sale/:id" element={<SingleHouse houses={houses} />} />
          <Route path="/api/housesForSale" element={<ListOfHouses housesToPass={houses} setHouses={setHouses} selectedStatus={selectedStatus ? { value: selectedStatus, label: selectedStatus } : null} />} />
          <Route path="/api/housesForRent" element={<ListOfHousesForRent housesToRent={housesForRent} setHousesForRent={setHousesForRent} selectedStatusRent={selectedStatusRent ? { value: selectedStatusRent, label: selectedStatusRent} : { value: "", label: "" } } />} />
          <Route path="/api/housesForRent/rent/:id" element={<SingleHouseForRent houseToRent={housesForRent} />} />
          <Route path="/api/sign-in" element={<SignIn />} />
          <Route path="/api/sign-up" element={<SignUp />} />

          <Route  element={<PrivateComponent />}>
          <Route path="/api/action" element={<ActionPage />} />
          </Route>
          <Route path="/api/create-house-for-sale" element={<HouseForSaleForm onSubmitForm={(status) => handleFormSubmission(status || "")} />} />
          <Route path="/api/create-house-for-rent" element={<HouseForRentForm onSubmitForm={ (status) => handleFormSubmissionRent(status || "")} />} />
          <Route path="/api/userHouses/:userId" element={<UserHouses />} />
          <Route path="/api/update-house-for-sale/:id" element={<UpdateHouseForSaleForm />} />
          <Route path="/api/update-house-for-rent/:id" element={<UpdateHouseForRentForm />} />
          
        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;




