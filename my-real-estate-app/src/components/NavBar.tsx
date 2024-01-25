import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../redux/user/userSlice";

import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { persistor } from "../redux/store";
import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

export const NavBar: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  

  const { currentUser } = useSelector((state: { user: UserState }) => ({
    currentUser: state.user.currentUser,
  }));

  useEffect(() => {
    if (!currentUser) {
      setShowTooltip(false);
    }
  }, [currentUser]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    persistor.purge();
    navigate("/");
  };

  const handleMouseEnter = () => {
    if (currentUser) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div id="navBar" className=" uppercase text-gray h-20 flex justify-between items-center  mx-auto">

      <h1 className="ml-10">
        <Link to="/">
          <span className="text-red-400 pr-2 font-bold uppercase font-mono text-2xl">L&D</span>
          <span className=" hidden md:inline md:text-cyan-500 font-bold uppercase font-mono">ESTATE</span>
        </Link>
      </h1>
 
      <h1 className="mr-10 text-amber-950 font-serif text-2xl w-1/6 ">
        <Link className="flex justify-between px-4 " to="/api/housesForSale">
          on sale 
          <BiSolidUpArrow />
          </Link>
      </h1>
      <h1 className="mr-10 text-amber-950 font-serif text-2xl w-1/6">
        <Link className="flex justify-between" to="/api/housesForRent">
          for rent
          <BiSolidDownArrow />
          </Link>
      </h1>
     

      {currentUser ? (
        <div className="relative mb-4 flex h-10 items-center">
          <Link to={"/api/action"}> 
          <img
            className="rounded-full h-9 w-9 object-cover cursor-context-menu"
            src={currentUser.photo ?? ""}
            alt="user picture"
          />
          </Link>
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleSignOut}
            className="select-none ml-2 rounded-lg bg-fuchsia-100 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-cyan-400 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-700/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Welcome, {currentUser.username}!
          </button>

          {showTooltip ? (
            <div className="absolute right-1/2 top-full text-amber-950 p-1 rounded-lg text-xs  ">
              click/sign out!
            </div>
          ) : null}
        </div>
      ) :  <h1 id="authorizedArea" className="mr-10">
      <Link to="/api/sign-up">Authorized-area</Link>
    </h1>}
    </div>
  );
};
