import { Link } from "react-router-dom"

import { useSelector } from "react-redux"

import { UserState } from "../redux/user/userSlice"


export const ActionPage = () => {
  const { currentUser } = useSelector((state: {user: UserState}) => ({ 
    currentUser: state.user.currentUser
   }))
 

  return (
    <div className="max-w-lg mx-auto text-center flex flex-col mt-10">
      <img className="self-center h-20 rounded-full" src={currentUser?.photo ?? " "} alt="profile picture" />
        <h1 className="text-3xl uppercase font-bold m-5 " >choose your next step</h1>
        <h1 className="m-5 uppercase"> <Link to="/api/create-house-for-sale">Sell a house</Link></h1>
        <h1 className="m-5 uppercase"><Link to="/api/create-house-for-rent">Rent a house</Link></h1>
       
        
    </div>
  )
}
