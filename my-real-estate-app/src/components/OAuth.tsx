import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/user/userSlice";
import React from "react";
import { useNavigate } from "react-router-dom";

export const OAuth: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    

    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log('result from hanlde GOOGLE CLICK',result)
      const res = await fetch("http://localhost:3000/api/auth/google", {
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
      console.log(' Oauth data from handle GOOGLE CLICK', data)
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
      Continute with google
    </button>
  );
};
