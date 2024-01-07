import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../redux/user/userSlice";

import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/user/userSlice"
import { useDispatch } from "react-redux"
import { persistor } from "../redux/store"



export const NavBar: React.FC = () => {

  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  // console.log('showTooltip when compenent mounts', showTooltip)
  

const { currentUser } = useSelector((state: { user: UserState }) => ({
  currentUser: state.user.currentUser,
}));

useEffect(() => {
  if( !currentUser) {
    setShowTooltip(false)
  }
}, [currentUser])



const dispatch = useDispatch()
const navigate = useNavigate();

const handleSignOut = () => {

  dispatch(signOut())
  persistor.purge();
  navigate('/')
  
}

const handleMouseEnter = () => {
  if (currentUser) {
    setShowTooltip(true);
  }
};

const handleMouseLeave = () => {
  setShowTooltip(false);
};


  return (
    <div className=" text-gray h-20 flex justify-between items-center w-9/12 mx-auto">
      <h1 className="ml-10">
        <Link to="/">
          <span className="text-red-500 pr-2 font-bold">L&D</span>
          <span className="text-blue-500 font-bold">ESTATE</span>
        </Link>
      </h1>
      <form className="flex bg-amber-200 w-50 h-10 items-center">
        <input
          type="text"
          placeholder="search ... "
          className="bg-transparent  focus:outline-none pl-5"
        />
        
      </form>
      <h1 className="mr-10">
        <Link to="/api/housesForSale">Houses on sale</Link>
      </h1>
      <h1 className="mr-10">
        <Link to="/api/housesForRent">Houses on rent</Link>
      </h1>
      <h1 className="mr-10">
        <Link to="/api/sign-up">Authorized-area</Link>
      </h1>
    
     
      {currentUser ? (
        <div className="relative mb-4">
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleSignOut}
            className="select-none rounded-lg bg-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-700/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Welcome, {currentUser.username}!
          </button>
          {showTooltip ?  (
            <div className="absolute right-1/2 top-full bg-red-100 text-black p-2 rounded-lg text-xs">
              Sign out
            </div>
          ) : null }
        </div>
      ) : null}
    </div>
  );
};
