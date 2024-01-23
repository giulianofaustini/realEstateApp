import { Link } from "react-router-dom"

import { useSelector } from "react-redux"

import { UserState } from "../redux/user/userSlice"


export const ActionPage = () => {
  const { currentUser } = useSelector((state: {user: UserState}) => ({ 
    currentUser: state.user.currentUser
   }))
 

   console.log("CURRNET current user from the action page", currentUser)

  return (
    <div className="max-w-lg mx-auto text-start flex flex-col mt-10">
      <img className="self-center h-20 rounded-full" src={currentUser?.photo ?? " "} alt="profile picture" />
        <h1 className="text-4xl uppercase m-5 font-bold hover:font-extrabold text-amber-950" >choose your next step</h1>
        <h1 className="m-5 uppercase font-bold hover:font-extrabold text-2xl text-amber-950"> <Link to="/api/create-house-for-sale">Sell a house</Link></h1>
        <h1 className="m-5 uppercase font-bold hover:font-extrabold text-2xl text-amber-950"><Link to="/api/create-house-for-rent">Rent a house</Link></h1>
        <h1 className="m-5 uppercase font-bold hover:font-extrabold text-2xl text-amber-950"><Link to={`/api/userHouses/${currentUser?._id}`}>Manage your properties</Link></h1>
       
        
    </div>
  )
}
