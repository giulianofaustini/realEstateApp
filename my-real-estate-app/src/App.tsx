import './App.css'
import { useState, useEffect } from 'react'
import { ListOfHouses } from './components/ListOfHouses';


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

  const [ houses, setHouses ] = useState<HouseProps[]>([])
  const [ loading, setLoading ] = useState(true)


  useEffect (() => {
    const fetchHouses = async () => {
      const response = await fetch('http://localhost:3000/api/houses')
      const data = await response.json()
      setHouses(data)
      setLoading(false)
    }
    fetchHouses()
  }, [])

  if (loading){
    return <div>loading...</div>
  }

  console.log(houses)

  return (
    <>
      <div> this is my real estate app</div>
      <ListOfHouses housesToPass={houses} />

    </>
  )
}

export default App
