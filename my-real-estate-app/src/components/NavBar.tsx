import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export const NavBar: React.FC = () => {
  return (
    <div className=" text-gray h-20 flex justify-between items-center mx-auto">
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
        <FaSearch className="m-5 color-gray  " />
      </form>
      <h1 className="mr-10">
        <Link to="/api/houses">Houses on sale</Link>
      </h1>
      <h1 className="mr-10">
        <Link to="/api/houses">Houses on rent</Link>
      </h1>
      <h1 className="mr-10">
        <Link to="/api/sign-in">Authorized-area</Link>
      </h1>
    </div>
  );
};
