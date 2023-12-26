import { HouseProps } from '../App';
import { useParams } from 'react-router-dom';

interface SingleHouseProps {
  houses: HouseProps[];
}

export const SingleHouse = ({ houses }: SingleHouseProps) => {
  const { id } = useParams<{ id: string }>();



  console.log('this is the id from the URL:', id); 

  // Find the selected house based on the id
  const selectedHouse = houses.find((house) => house.id === id);

  if (!selectedHouse) {
    return <div>House not found!</div>;
  }

  return (
    <div>
      <h1>{selectedHouse.title}</h1>
      <p>{selectedHouse.description}</p>
      <p>{selectedHouse.price}</p>
      <p>{selectedHouse.address}</p>
      <p>{selectedHouse.agent}</p>
      <p>{selectedHouse.bathrooms}</p>
      <p>{selectedHouse.bedrooms}</p>
    </div>
  );
};






