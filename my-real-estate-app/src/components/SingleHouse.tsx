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
import { GiBrickWall } from "react-icons/gi";
import React from "react";

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
                  className="h-[500px] md:h-[750px]"
                  style={{
                    background: `url(${url}) center, no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="flex flex-col w-screen px-2 justify-evenly md:w-2/3 md:mx-10 md:flex md:flex-col md:justify-normal md:ml-20 md:p-20 ">
        <span className="uppercase md:mb-5 font-bold ">{selectedHouse.title} for sale</span>
  
        <p className="font-light ">
           Description:  { ' ' }
          <span className="font-semibold"  >{selectedHouse.description}  </span>
          
        </p>
        <div className="flex items-center size:9 gap-2 mt-2.5 "> 
        <FaMapMarkerAlt className="text-green-600 size-8 " />
        <span className="pr-10 text-sm md:text-3xl" >{selectedHouse.address} { ' ' }  </span>

        <FaBath className="text-green-600 size-8 " />
        <span className="md:pr-10 text-sm md:text-3xl " > {selectedHouse.bathrooms} { ' ' } </span>
        
        <MdBedroomChild className="text-green-600 size-8  " />
        <span className="md:pr-10 text-sm md:text-3xl" > {selectedHouse.bedrooms} { ' ' } </span> 

        <GiBrickWall className="text-green-600 text-lg size-8  "/>
        <span className="md:pr-10 text-sm md:text-3xl " > {selectedHouse.year} { ' ' } </span> 
      
        </div>
        <div className="flex justify-start item-center mt-2">
        <FaEuroSign className="text-green-600 md:size-8 " />
        <span className="md:pr-10 text-sm md:text-3xl "> {selectedHouse.price} </span>
        </div>


        <p className=" mt-2">Contact the owner {selectedHouse.addedBy} at this email address: {selectedHouse.userEmail}</p>

      </div>
    </div>
  );

}
  