import { Link } from "react-router-dom";
import { PiWarehouseLight } from "react-icons/pi";
import { FaCheckDouble } from "react-icons/fa";
import React from "react";
import { PiCircleFill } from "react-icons/pi";


export const Home = () => {
  const backgroundImageStyle = {
    backgroundImage: "url(/images/pexels-sammsara-luxury-modern-home-1099816.jpg)",
    
    backgroundSize: "93%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "12px",
    opacity: "0.90",
    width: "100%",
  
  };

  return (
    <div>
      <div
        style={backgroundImageStyle}
        className="flex items-center justify-center w-auto h-[60vh] md:h-[96vh]"
      >
        <div className="flex flex-col items-center  h-full">
          <h1 className="text-xl font-bold mb-2 md:mb-4 mt-8 md:mt-16 md:font-extrabold md:text-5xl text-amber-950 font-mono ">
            {" "}
            MODERN HOUSING SOLUTIONS
          </h1>
        

          <form className="flex flex-row  mx-auto  gap-0.5 items-center justify-center md:flex-row md:items-center">
            <Link to={"/api/rentInYourArea"}>
           
              <input
                type="text"
                placeholder="rent in your area"
                id="rentInYourArea"
                className="cursor-pointer  ml-2 text-sm py-2 px-1 md:text-2xl  font-mono text-amber-950 italic md:mr-5 md:h-10 md:pl-4 md:p-7 first-line:border rounded-lg bg-sky-100 hover:bg-sky-200 active:bg-sky-300 focus:outline-none focus:ring focus:ring-violet-100"
              />
              
            </Link>
            <Link to={"/api/buyInYourArea"}>
              <input
                type="text"
                id="buyInYourArea"
                placeholder="buy in your area"
                className="text-sm cursor-pointer mr-2 py-2 px-1 md:text-2xl font-mono text-amber-950 italic md:mr-5 md:h-10 md:pl-4 md:p-7 border rounded-lg bg-sky-100 hover:bg-sky-200 active:bg-sky-300 focus:outline-none focus:ring focus:ring-violet-100"
              />
            </Link>
          </form>
          <div className="h-full relative"> <PiCircleFill className="absolute mix-blend-multiply -focus:translate-x-5 transition-all text-cyan-100 text-[60px] bottom-0 right-3 lg:hidden " /> <PiCircleFill className="mix-blend-multiply focus:translate-x-5 text-fuchsia-100 absolute text-[60px] bottom-0 -right-5 lg:hidden " /> </div>
        </div>
      
      </div>
 
      <div className="w-2/3 text-sm mx-auto md:mt-10 md:mb-10">
        <span className="uppercase font-bold md:font-extrabold md:text-4xl text-cyan-700 font-serif ">
          Welcome to L&D Estate, your Trusted Real Estate Partner
        </span>
        <div className="flex flex-col md:grid md:grid-cols-3 md:grid-flow-row-dense md:justify-center md:gap-10 md:items-top font-bold md:size-70 mt-8 text-cyan-700">
          <p className="md:col-span-2">
            At L&D Estate, we understand that finding the perfect home is more
            than just a transaction; it's about finding a space where memories
            are created and dreams come to life. With a commitment to excellence
            and a passion for real estate, we proudly serve our community in
            connecting individuals and families with their ideal properties.
          </p>
        
          <PiWarehouseLight className="text-red-600 w-full  text-5xl md:size-20 font-bold md:justify-self-center" />
     
          <p className=" opacity-80 uppercase">Our Approach: </p>
          <p>
            1 - Personalized Service: Our dedicated team of real estate
            professionals is here to guide you through every step of the
            process. We believe in personalized service tailored to your unique
            needs, ensuring a smooth and enjoyable experience.
          </p>
          <p>
            2 - Extensive Property Portfolio: Explore a diverse range of
            properties in our extensive portfolio. Whether you're looking for a
            cozy apartment, a family-friendly house, or an investment
            opportunity, we have a property to suit every lifestyle and budget.
          </p>
          <p className=" opacity-80" >Our Services: </p>
          <p>
            1 - Buying and Selling: Whether you're buying your dream home or
            selling a property, we streamline the process for you. Our
            experienced agents work tirelessly to match buyers with the right
            homes and assist sellers in showcasing their properties to the
            fullest.
          </p>
          <p>
            2 - Rentals: Searching for the perfect rental? We offer a diverse
            selection of rental properties, each meeting our high standards for
            quality and comfort. Let us help you find a place to call home.
          </p>
          <p className="col-start-1 col-span-3 mt-5 text-red-600">Why Choose L&D</p>
          <p className="flex  md:justify-evenly uppercase md:font-extrabold">Professionalism <FaCheckDouble /></p>
          <p  className="flex md:justify-evenly uppercase md:font-extrabold"> Client-Centric Approach <FaCheckDouble /></p>
          <p  className="flex  md:justify-evenly uppercase md:font-extrabold">Tech-Enabled Solutions <FaCheckDouble /></p>
         
        </div>
      </div>
    </div>
  );
};
