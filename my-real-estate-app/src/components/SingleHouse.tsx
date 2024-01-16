import { HouseProps } from "../App";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBath } from "react-icons/fa6";
import { MdBedroomChild } from "react-icons/md";
import { FaEuroSign } from "react-icons/fa";

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
      <div >
        <Swiper navigation>
          {selectedHouse &&
            selectedHouse.imageUrl.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[850px]"
                  style={{
                    background: `url(${url}) center, no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="w-2/3 mx-10 flex flex-col justify-normal ml-20 p-20 ">
        <span className="uppercase mb-5 font-bold ">{selectedHouse.title} for sale</span>
  
        <p className="font-light ">
           Description:  { ' ' }
          <span className="font-semibold"  >{selectedHouse.description}  </span>
          
        </p>
        <div className="flex items-center  gap-2 mt-2.5"> 
        <FaMapMarkerAlt className="text-green-600 size-8 " />
        <span className="pr-10 " >{selectedHouse.address} { ' ' }  </span>

        <FaBath className="text-green-600 size-8 " />
        <span className="pr-10 " > {selectedHouse.bathrooms} { ' ' } </span>
        
        <MdBedroomChild className="text-green-600 size-8 " />
        <span className="pr-10 " > {selectedHouse.bedrooms} { ' ' } </span> 
      
        </div>
        <div className="flex item-center mt-2">
        <FaEuroSign className="text-green-600 size-8 " />
        <span> {selectedHouse.price} </span>
        </div>


        <p className=" mt-2">Call our agent {selectedHouse.agent} at this number: 0409380895</p>

      </div>
    </div>
  );

}
  