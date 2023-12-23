import "./App.css";
import { useState, useEffect } from "react";
import { ListOfHouses } from "./components/ListOfHouses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { SingleHouse } from "./components/SingleHouse";

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

function App() {
  const [houses, setHouses] = useState<HouseProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("http://localhost:3000/api/houses");
      const data = await response.json();
      setHouses(data);
      setLoading(false);
    };
    fetchHouses();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  console.log(houses);

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/api/houses"
            element={<ListOfHouses housesToPass={houses} />}
          />
          <Route path="/api/houses/:id" element={<SingleHouse />} />
        
        </Routes>
      </Router>
    </>
  );
}

export default App;
