import { housesForRentInterface  } from "../App"

export interface ListOfHousesForRentProps {
    housesToRent: housesForRentInterface[];
}


export const ListOfHousesForRent = ({ housesToRent} : ListOfHousesForRentProps) => {
  return (

    <div>
{ housesToRent.map((house) => (
    <div key={house.id}>
        <div>{house.title}</div>
        <div>{house.description}</div>
        <div>{house.monthlyRent}</div>
        <div>{house.rentalDeposit}</div>
        <div>{house.address}</div>
        <div>{house.location}</div>
        <div>{house.imageUrl}</div>
        <div>{house.agent}</div>
        <div>{house.bedrooms}</div>
        <div>{house.bathrooms}</div>

    </div>
))}
    </div>
  )
}
