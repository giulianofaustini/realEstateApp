import { Link } from "react-router-dom";
import { PiWarehouseLight } from "react-icons/pi";
import { FaCheckDouble } from "react-icons/fa";
import React from "react";


export const Home = () => {
  const backgroundImageStyle = {
    backgroundImage: "url(/images/pexels-sammsara-luxury-modern-home-1099816.jpg)",
    
    backgroundSize: "93%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "12px",
    opacity: "0.90",
    width: "100%",
    height: "95vh",
  };

  return (
    <div>
      <div
        style={backgroundImageStyle}
        className="flex items-center justify-center w-auto"
      >
        <div className="flex flex-col items-center  h-full">
          <h1 className="text-lg font-bold mb-4 mt-16 md:font-extrabold md:text-5xl text-amber-950 font-mono ">
            {" "}
            MODERN HOUSING SOLUTIONS
          </h1>

          <form className="flex flex-row items-center">
            <Link to={"/api/rentInYourArea"}>
           
              <input
                type="text"
                placeholder="rent in your area . . . "
                id="rentInYourArea"
                className="cursor-pointer font-mono text-amber-950 italic mr-5 h-10 pl-4 p-7 first-line:border rounded-lg bg-sky-100 hover:bg-sky-200 active:bg-sky-300 focus:outline-none focus:ring focus:ring-violet-100"
              />
              
            </Link>
            <Link to={"/api/buyInYourArea"}>
              <input
                type="text"
                id="buyInYourArea"
                placeholder="buy in your area . . ."
                className="cursor-pointer font-mono text-amber-950 italic mr-5 h-10 pl-4 p-7 border rounded-lg bg-sky-100 hover:bg-sky-200 active:bg-sky-300 focus:outline-none focus:ring focus:ring-violet-100"
              />
            </Link>
          </form>
        </div>
      </div>
      <div className="w-2/3 mx-auto mt-10 mb-10">
        <span className="uppercase font-extrabold text-4xl text-cyan-700 font-serif ">
          Welcome to L&D Estate, your Trusted Real Estate Partner
        </span>
        <div className="grid grid-cols-3 grid-flow-row-dense justify-center gap-10 items-top font-bold size-70 mt-8 text-cyan-700">
          <p className="col-span-2">
            At L&D Estate, we understand that finding the perfect home is more
            than just a transaction; it's about finding a space where memories
            are created and dreams come to life. With a commitment to excellence
            and a passion for real estate, we proudly serve our community in
            connecting individuals and families with their ideal properties..
          </p>
          <PiWarehouseLight className="text-red-600 size-20 font-bold justify-self-center" />
          <p className=" opacity-80">Our Approach: </p>
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
          <p className="flex  justify-evenly uppercase font-extrabold">Professionalism <FaCheckDouble /></p>
          <p  className="flex justify-evenly uppercase font-extrabold"> Client-Centric Approach <FaCheckDouble /></p>
          <p  className="flex  justify-evenly uppercase font-extrabold">Tech-Enabled Solutions <FaCheckDouble /></p>
         
        </div>
      </div>
    </div>
  );
};
