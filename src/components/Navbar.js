import React, { useContext } from "react";
import { authContext } from "../Context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, logoutUser } = useContext(authContext);
  const location = useLocation();
  console.log("Navbar.js",location.pathname)

  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (err) {
      console.log(err.code);
    }
  };

  return (
    <div className="flex items-center justify-between p-6 sm:p-8 w-full z-[100] absolute">
      <Link to={`${user ? "/" : location.pathname}`}>
        <img
          src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
          alt="logo"
          className="w-28 sm:w-32 cursor-pointer"
        />
      </Link>
      {user ? (
        <div>
          <Link to="/account">
            <button className=" px-4 py-2 sm:px-6 rounded text-white">
              Account
            </button>
          </Link>
          <button
            onClick={logoutHandler}
            className="bg-red-600 px-4 py-2 sm:px-6 rounded text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className=" px-4 py-2 sm:px-6 rounded text-white">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-4 py-2 sm:px-6 rounded text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
