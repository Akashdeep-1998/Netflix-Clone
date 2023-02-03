import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";
import { RiEmotionSadFill } from "react-icons/ri";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, signupUser } = useContext(authContext);
  const navigate = useNavigate();

  const onSignUpHandler = async () => {
    try {
      setLoading(true);
      await signupUser(email, password);
      console.log(user);
      navigate("/");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.code.split("/")[1].replaceAll("-", " ").toUpperCase());
      if (err.code.search("password") > 0) {
        setPassword("");
      } else {
        setEmail("");
        setPassword("");
      }
      console.log(err.code);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/e451379a-dd0a-4657-b530-4ca4c0cb2aee/430b26cf-b6e1-473e-a55d-0abc03631481/IN-en-20230123-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="poster"
          className="w-full h-screen object-cover"
        />
        <div className="absolute h-full w-full top-0 bg-black/60">
          <div className="relative top-[15%] w-[90%] max-w-[400px] h-[550px] bg-black/75 m-auto">
            <div className="flex flex-col w-[80%] py-10 m-auto text-white">
              <p className="text-3xl sm:text-4xl font-bold pb-5 pt-6">
                Sign Up
              </p>
              {error && (
                <p className="flex justify-center gap-1 items-center font-bold text-center text-red-600 pb-3">
                  {error} <RiEmotionSadFill size={18} />
                </p>
              )}
              <input
                name="signupEmail"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 py-3 px-3 mb-4 rounded outline-none"
              />
              <input
                name="signupPassword"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 py-3 px-3 mb-10 rounded outline-none"
              />
              <button
                onClick={onSignUpHandler}
                className="bg-red-600 text-white font-bold rounded py-3"
              >
                {loading ? "Please wait..." : "Sign Up"}
              </button>
              <div className="text-xs text-gray-600 flex justify-between py-6">
                <div className="cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <label>Remember me</label>
                </div>
                <p className="cursor-pointer">Need Help?</p>
              </div>
              <p className="text-sm text-gray-600">
                Already subscribed to Netflix?&nbsp;
                <Link to="/login">
                  <span className="text-white font-bold">Sign In</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
