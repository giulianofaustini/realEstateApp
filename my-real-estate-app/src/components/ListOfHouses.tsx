import { HouseProps } from '../App';


export interface ListOfHousesProps {
    housesToPass: HouseProps[];
    }




export const ListOfHouses = ( {housesToPass} : ListOfHousesProps ) => {

    console.log('from List Of Houses component', housesToPass)


  return (
    <>
    <div>ListOfHouses</div>
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

