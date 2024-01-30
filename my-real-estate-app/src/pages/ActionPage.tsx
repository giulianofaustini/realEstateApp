import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { UserState, signOut } from "../redux/user/userSlice";
import React from "react";
import { persistor } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { housesForRentInterface } from "../../../src/interfaces/housesForRentInterface";
import { HouseInterface } from "../../../src/interfaces/houseInterface";

interface Props {
  houseToRent: housesForRentInterface[];
  housesToPass: HouseInterface[];
}

export const ActionPage: React.FC<Props> = ({ houseToRent, housesToPass }) => {
  const { currentUser } = useSelector((state: { user: UserState }) => ({
    currentUser: state.user.currentUser,
  }));

  const userMatchRent = houseToRent.filter((house) => {
    const thisMatchrent = house.userId === currentUser?._id;
    return thisMatchrent;
  });
  const userMatchSale = housesToPass.filter((house) => {
    const thisMatchsale = house.userId === currentUser?._id;
    return thisMatchsale;
  });

  const backendURL =
    process.env.NODE_ENV === "production"
      ? "https://sharestateback.onrender.com"
      : "http://localhost:3000";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    persistor.purge();
    navigate("/");
    console.log("sign out");
  };

  const handleDeleteAccount = () => {
    if (userMatchRent.length > 0 || userMatchSale.length > 0) {
      alert(
        "You cannot delete you account because you have properties listed in the app. Delete all your property from your list in your account before deliting your account"
      );
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (confirmDelete) {
      fetch(`${backendURL}/api/delete-user/${currentUser?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: currentUser?._id }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete account");
          }
          return res.json();
        })
        .then((data) => {
          console.log("delete user data", data);
          dispatch(signOut());
          persistor.purge();
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting account:", error.message);
        });
    }
  };

  return (
    <div
      id="actionPage"
      className="max-w-lg mx-auto text-start flex flex-col mt-10"
    >
      <img
        className="self-center h-20 rounded-full"
        src={currentUser?.photo ?? " "}
        alt="profile picture"
      />

      <h1 className="text-xl mx-auto md:text-4xl uppercase m-5 font-bold hover:font-extrabold text-amber-950">
        choose your next step
      </h1>

      <button className="shadow-md hover:shadow-amber-950  ">
        <h1 className="m-5 uppercase font-bold hover:font-extrabold text-2xl text-amber-950">
          {" "}
          <Link to="/api/create-house-for-sale">Sell a house</Link>
        </h1>
      </button>
      <button className="shadow-md hover:shadow-amber-950">
        <h1 className="m-5 uppercase font-bold hover:font-extrabold text-2xl text-amber-950">
          {" "}
          <Link to="/api/housesForSale">browse houses on sale</Link>
        </h1>
      </button>
      <button className="shadow-md hover:shadow-amber-950">
        <h1 className="m-5 uppercase font-bold hover:font-extrabold text-2xl text-amber-950">
          <Link to="/api/create-house-for-rent">Rent a house</Link>
        </h1>
      </button>
      <button className="shadow-md  hover:shadow-amber-950">
        <h1 className="m-5 uppercase font-bold hover:font-extrabold text-2xl text-amber-950">
          <Link to="/api/housesForRent">Browse houses for rent</Link>
        </h1>
      </button>
      <button className="shadow-xl hover:shadow-amber-950 ">
        <h1 className="m-5 uppercase font-bold hover:font-extrabold text-2xl text-amber-950">
          <Link to={`/api/userHouses/${currentUser?._id}`}>
            Manage your properties
          </Link>
        </h1>
      </button>
      <div className="flex gap-2 justify-end px-4 mt-2 ">
        <button
          className="bg-fuchsia-100 rounded-lg p-2 px-4 mt-2 text-cyan-400 uppercase hover:text-cyan-900"
          onClick={handleSignOut}
        >
          sign out
        </button>
        <button
          className="bg-fuchsia-100 rounded-lg p-2 px-4 mt-2 text-cyan-400 uppercase hover:text-cyan-900"
          onClick={handleDeleteAccount}
        >
          delete account
        </button>
      </div>
    </div>
  );
};
