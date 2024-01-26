import { Link } from "react-router-dom"

import { useSelector } from "react-redux"

import { UserState, signOut } from "../redux/user/userSlice"
import React from "react"
import { persistor } from "../redux/store"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"


export const ActionPage = () => {
  const { currentUser } = useSelector((state: {user: UserState}) => ({ 
    currentUser: state.user.currentUser
   }))
   
   const navigate = useNavigate()
    const dispatch = useDispatch()
 

   console.log("CURRNET current user from the action page", currentUser)


   const handleSignOut = () => {
     dispatch(signOut())
     persistor.purge()
     navigate("/")
    console.log("sign out")
    }

  return (
    <div id="actionPage" className="max-w-lg mx-auto text-start flex flex-col mt-10">
      <img className="self-center h-20 rounded-full" src={currentUser?.photo ?? " "} alt="profile picture" />
      
        <h1 className="text-xl mx-auto md:text-4xl uppercase m-5 font-bold hover:font-extrabold text-amber-950" >choose your next step</h1>
        
        <button className="shadow-md hover:shadow-amber-950  ">
        <h1 className="m-5 uppercase font-bold hover:font-extrabold text-2xl text-amber-950"> <Link to="/api/create-house-for-sale">Sell a house</Link></h1>
        </button>
        <button className="shadow-md hover:shadow-amber-950">
        <h1 className="m-5 uppercase font-bold hover:font-extrabold text-2xl text-amber-950"> <Link to="/api/housesForSale">browse houses on sale</Link></h1>
        </button>
        <button className="shadow-md hover:shadow-amber-950">
        <h1 className="m-5 uppercase font-bold hover:font-extrabold text-2xl text-amber-950"><Link to="/api/create-house-for-rent">Rent a house</Link></h1>
        </button>
        <button className="shadow-md  hover:shadow-amber-950">
        <h1 className="m-5 uppercase font-bold hover:font-extrabold text-2xl text-amber-950"><Link to="/api/housesForRent">Browse houses for rent</Link></h1>
        </button>
        <button className="shadow-xl hover:shadow-amber-950 ">  
        <h1 className="m-5 uppercase font-bold hover:font-extrabold text-2xl text-amber-950"><Link to={`/api/userHouses/${currentUser?._id}`}>Manage your properties</Link></h1>
        </button>
        <div className="flex justify-end px-4 mt-2 ">
        <button className="bg-fuchsia-100 rounded-lg p-2 px-4 mt-2 text-cyan-400 uppercase " onClick={handleSignOut}>
          sign out
        </button>
        </div>
       
      
       
       
       
        
    </div>
  )
}

