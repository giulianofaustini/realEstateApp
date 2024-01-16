import { HousesForRentProps } from "../App";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle" 

export interface SingleHouseForRentProps {
  houseToRent: HousesForRentProps[];
}

export const SingleHouseForRent = ({
  houseToRent,
}: SingleHouseForRentProps) => {

  SwiperCore.use([Navigation]);
  
  const { id } = useParams<{ id: string }>();

  console.log("this is the id from the URL of a house to rent:", id);

  const selectedHouse = houseToRent.find((house) => house._id === id);

  if (!selectedHouse) {
    return <div>House not found!</div>;
  }

  return (
    <div>
       <div>
        <Swiper navigation>
          {selectedHouse &&
            selectedHouse.imageUrl.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[800px]"
                  style={{
                    background: `url(${url}) center, no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    <div className=" w-2/3   mx-10 " >
    
      <span className="uppercase" > {selectedHouse.title}  FOR RENT</span>
      
      <div>Rent a {selectedHouse.description} for {selectedHouse.monthlyRent} € per month</div>
      <div></div>
      <div>Where? {selectedHouse.address}</div>
      <div>City of {selectedHouse.location}</div>
    
      
      <div>Number of bedrooms: {selectedHouse.bedrooms} </div>
      <div>Number of bathrooms: {selectedHouse.bathrooms}</div>
      <div>The rental deposit for this house is {selectedHouse.rentalDeposit} €</div>
      <div>Call our agent {selectedHouse.agent} at this number: 0409380895</div>
    
    </div>
    </div>  
  );
};
