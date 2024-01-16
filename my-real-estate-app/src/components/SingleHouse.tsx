import { HouseProps } from "../App";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

interface SingleHouseProps {
  houses: HouseProps[];
}

export const SingleHouse = ({ houses }: SingleHouseProps) => {
  const { id } = useParams<{ id: string }>();

  SwiperCore.use([Navigation]);

  console.log("this is the id from the URL:", id);

  const selectedHouse = houses.find((house) => house._id === id);

  if (!selectedHouse) {
    return <div>House not found!</div>;
  }


  return (
    <div>
      <div className="">
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
  
      <div className="w-2/3 mx-10">
        <span className="uppercase">{selectedHouse.title} for sale</span>
  
        <p>
          Buy a {selectedHouse.description} for {selectedHouse.price} €
        </p>
  
        <p>Where? {selectedHouse.address}</p>
        <p>Number of bathrooms: {selectedHouse.bathrooms}</p>
        <p>Number of bedrooms: {selectedHouse.bedrooms}</p>
        <p>Call our agent {selectedHouse.agent} at this number: 0409380895</p>
      </div>
    </div>
  );

}
  