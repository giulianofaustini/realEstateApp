import { housesForRentInterface } from "../App";
import { useParams } from "react-router-dom";

export interface SingleHouseForRentProps {
  houseToRent: housesForRentInterface[];
}

export const SingleHouseForRent = ({
  houseToRent,
}: SingleHouseForRentProps) => {
  const { id } = useParams<{ id: string }>();

  console.log("this is the id from the URL of a house to rent:", id);

  const selectedHouse = houseToRent.find((house) => house.id === id);

  if (!selectedHouse) {
    return <div>House not found!</div>;
  }

  return (
    <div >
      <div>{selectedHouse.title}</div>
      <div>{selectedHouse.description}</div>
      <div>{selectedHouse.monthlyRent}</div>
      <div>{selectedHouse.rentalDeposit}</div>
      <div>{selectedHouse.address}</div>
      <div>{selectedHouse.location}</div>
      <div>{selectedHouse.imageUrl}</div>
      <div>{selectedHouse.agent}</div>
      <div>{selectedHouse.bedrooms}</div>
      <div>{selectedHouse.bathrooms}</div>
    </div>
  );
};
