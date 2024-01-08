import { useState } from "react";
import { UserInterface } from "../../../src/interfaces/userInterface";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoading } from "../redux/user/userSlice";
import { useSelector } from "react-redux";
import { UserState } from "../redux/user/userSlice"



export const SignIn = () => {
  const [formData, setFormData] = useState<UserInterface>({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  

  const { currentUser, loading } = useSelector((state: { user: UserState }) => ({
    currentUser: state.user.currentUser,
    loading: state.user.loading,
  }));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const res = await fetch("http://localhost:3000/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('data from the handle submit form to check what info I have', data);

      if (res.ok) {
        const { id, username, password , email, isAdmin, createdAt, updatedAt } =
          data as UserInterface;
          console.log(' email from the singin function' , email)
        dispatch(
          setCurrentUser({
            id,
            username,
            password, 
            email,
            isAdmin,
            createdAt,
            updatedAt,
          })
        );
     

        setFormData({
          username: "",
          email: "",
          password: "",
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        navigate("/api/action");
      } else {
        alert(data.message);
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  // console.log(formData)
  return (
    
    <div className="max-w-lg  mx-auto mt-10">
      {currentUser && (
        <div className="mb-4">
          <p>Welcome, {currentUser.username}!</p>
        </div>
      )}
      <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleFormChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleFormChange}
        />
        <button
          disabled={loading}
          className=" bg-sky-200 p-3 rounded-lg text-white hover:opacity-85 hover:text-slate-500 disabled:opacity-50"
          type="submit"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
      <div className="flex">
        <p className="mt-5 text-slate-500">
          {" "}
          If you do not have an account, sign up{" "}
        </p>
        <Link
          className="mt-5 ml-1 text-blue-500 hover:text-blue-600 "
          to="/api/sign-up"
        >
          Now
        </Link>
      </div>
    </div>
  );
};
