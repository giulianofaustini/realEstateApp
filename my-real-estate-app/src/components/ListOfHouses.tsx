import { HouseProps } from '../App';
import { useNavigate } from 'react-router-dom';


export interface ListOfHousesProps {
    housesToPass: HouseProps[];
    }




export const ListOfHouses = ( {housesToPass} : ListOfHousesProps ) => {

    console.log('from List Of Houses component', housesToPass)

    const navigate = useNavigate();


  return (
    <>
    <div>ListOfHouses</div>
    <button onClick={() => navigate('/')}>home</button>
    <div>
    {housesToPass.map(house => (
        <div key={house.id}>
          <div>{house.title}</div>
          <div>{house.description}</div>
          <div>{house.price}</div>
          <div>{house.address}</div>
         
          <div>{house.agent}</div>
          <div>{house.bedrooms}</div>
          <div>{house.bathrooms}</div>
        </div>
      ))}
      </div>
      </>
  )
}

