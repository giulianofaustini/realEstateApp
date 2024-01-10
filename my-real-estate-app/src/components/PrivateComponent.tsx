import { useSelector } from "react-redux";
import { UserState } from "../redux/user/userSlice";
import { Outlet, Navigate } from "react-router-dom";

export const PrivateComponent = () => {
  const { currentUser } = useSelector((state: { user: UserState }) => ({
    currentUser: state.user.currentUser,
  }));

  return <div>{currentUser ? <Outlet /> : <Navigate to="/api/sign-in" />}</div>;
};
