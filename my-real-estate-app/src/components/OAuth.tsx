import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/user/userSlice";
import React from "react";
import { useNavigate } from "react-router-dom";

export const OAuth: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backendURL = process.env.NODE_ENV === 'production' ? 'https://sharestateback.onrender.com' : 'http://localhost:3000';


  const handleGoogleClick = async () => {
    

    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(`${backendURL}/api/auth/google`, {

      
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(setCurrentUser(data));
      navigate("/");
    } catch (error) {
      console.log("cannot sign in with googlwe");
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 uppercase"
    >
      Continue with google
    </button>
  );
};
