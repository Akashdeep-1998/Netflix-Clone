import React, { useState, useEffect, useContext } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "./Auth";
import { authContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

console.log("I am in 'features' branch.")
const Account = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  const { user } = useContext(authContext);

  const leftSlider = () => {
    let left = document.getElementById(`${"slideShow"}`);
    left.scrollLeft = left.scrollLeft - 500;
  };
  const rightSlider = () => {
    let right = document.getElementById(`${"slideShow"}`);
    right.scrollLeft = right.scrollLeft + 500;
  };

  const deleteLikedMovies = async (id) => {
    const filteredMovies = movies.filter((movie) => movie.id !== id);
    await updateDoc(doc(db, "users", `${user?.email}`), {
      savedMovies: filteredMovies,
    });
    console.log("filteredMovies:- ", filteredMovies);
  };

  useEffect(() => {
    const fetchLikedMovies = () => {
      onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
        if (doc.data()?.savedMovies.length === 0) {
          setError(true);
        } else {
          setMovies(doc.data()?.savedMovies);
          console.log(doc.data()?.savedMovies);
        }
      });
    };
    fetchLikedMovies();
    return () => {
      fetchLikedMovies();
    };
  }, [user?.email]);

  return (
    <>
      <div className="w-full h-[450px] text-white">
        <div className="w-full h-full">
          <div className="w-full h-[450px] bg-black/60 absolute"></div>
          <img
            className="w-full h-full object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/e451379a-dd0a-4657-b530-4ca4c0cb2aee/430b26cf-b6e1-473e-a55d-0abc03631481/IN-en-20230123-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
            alt="Poster"
          />
          <h1 className="absolute top-[30%] font-bold text-4xl md:text-5xl px-4">
            My Movies
          </h1>
        </div>
      </div>
      <h2 className="text-white font-bold md:text-xl p-4">My Movies</h2>
      {error ? (
        <h1 className=" text-gray-400 p-4">
          You haven't picked your favourite movie(s).
        </h1>
      ) : (
        <div className="relative flex items-center group">
          <AiFillLeftCircle
            className="text-white absolute z-10 left-0 opacity-20 hover:opacity-90 cursor-pointer hidden group-hover:block"
            size={40}
            onClick={leftSlider}
          />
          <div
            id={"slideShow"}
            className="relative w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {movies?.map((movie) => (
              <div
                key={movie.id}
                className="w-[192px] sm:w-[224px] md:w-[256px] lg:w-[286px] inline-block cursor-pointer p-2 relative"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.img}`}
                  alt={movie.title}
                  className="w-full h-auto block"
                />

                <div className="absolute center top-0 left-0 w-full h-full bg-black/80 opacity-0 hover:opacity-100 duration-200">
                  <Link
                    to={`/movie?id=${movie.id}&title=${movie.title}&img=${movie.img}&release_date=${movie.releasedDate}&overview=${movie.overview}&rating=${movie.rating}`}
                  >
                    <p className="flex justify-center items-center whitespace-normal h-full text-white text-xs md:text-sm text-center">
                      {movie.title}
                    </p>
                  </Link>
                  <p onClick={() => deleteLikedMovies(movie.id)}>
                    <RxCross2
                      className="absolute top-4 right-4 text-gray-300"
                      size={20}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <AiFillRightCircle
            className="text-white absolute z-10 right-0 opacity-20 hover:opacity-90 cursor-pointer hidden group-hover:block"
            size={40}
            onClick={rightSlider}
          />
        </div>
      )}
    </>
  );
};

export default Account;
