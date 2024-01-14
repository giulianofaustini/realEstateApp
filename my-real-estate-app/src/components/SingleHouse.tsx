import { HouseProps } from '../App';
import { useParams } from 'react-router-dom';

interface SingleHouseProps {
  houses: HouseProps[];
}

export const SingleHouse = ({ houses }: SingleHouseProps) => {
  const { id } = useParams<{ id: string }>();



  console.log('this is the id from the URL:', id); 

  const selectedHouse = houses.find((house) => house._id === id);

  if (!selectedHouse) {
    return <div>House not found!</div>;
  }

  return (
    <div className="flex justify-center h-screen mt-10 "> 
    
    <div  className=" w-2/3   mx-10 ">
    <span className="uppercase"> {selectedHouse.title} for sale </span>
  
      <p>Buy a {selectedHouse.description} for {selectedHouse.price} € </p>

      <p>Where? {selectedHouse.address}</p>
      <p>Number of bathrooms: {selectedHouse.bathrooms}</p>
      <p>Number of bedrooms: {selectedHouse.bedrooms}</p>
      <p>Call our agent {selectedHouse.agent} at this number: 0409380895</p>
      <div className=' grid grid-cols-2 gap-3 '>
      { selectedHouse.imageUrl.map((image) => (
       
        <img className='max-w-80 justify-self-center' src={image} alt="all pictures in the listing" />
        
      ))}

</div>
    </div>
    </div>
  );
};






