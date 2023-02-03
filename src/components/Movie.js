import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { authContext } from "../Context/AuthContext";
import { db } from "./Auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Movie = ({ id, title, img, overview, rating, release_date }) => {
  const [like, setLike] = useState(false);
  const { user } = useContext(authContext);

  const movieRef = doc(db, "users", `${user?.email}`);
  const saveMoviesHandler = async () => {
    if (user) {
      setLike(!like);
      await updateDoc(movieRef, {
        savedMovies: arrayUnion({
          id: id,
          title: title,
          img: img,
          overview: overview,
          rating:rating,
          releasedDate: release_date,
        }),
      });
    }
  };

  console.log("Movie.js",typeof(rating));
  return (
    <div
      id={id}
      className="w-[192px] sm:w-[224px] md:w-[256px] lg:w-[286px] inline-block cursor-pointer p-2 relative"
    >
      <img src={`https://image.tmdb.org/t/p/w500/${img}`} alt={title} />

      <div className="absolute center top-0 left-0 w-full h-full bg-black/80 opacity-0 hover:opacity-100 duration-200">
        <Link
          to={`/movie?id=${id}&title=${title}&img=${img}&release_date=${release_date}&overview=${overview}&rating=${rating}`}
        >
          <p className="flex justify-center items-center whitespace-normal h-full text-white text-xs md:text-sm text-center">
            {title}
          </p>
        </Link>
        <p onClick={saveMoviesHandler}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
