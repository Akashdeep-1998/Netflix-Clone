import React, { useState, useEffect } from "react";
import requests from "../API";
import axios from "axios";

const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  const overviewLength = (str, num) => {
    if (str?.length > num) return str.slice(0, num) + " ...";
    else return str;
  };

  useEffect(() => {
    const fetchPopularMovies = () => {
      axios
        .get(requests.popularMovies)
        .then((result) => {
          setMovies(result.data.results);
          console.log(result.data.results);
        })
        .catch((err) => console.log(err));
    };
    fetchPopularMovies();

    return () => {
      fetchPopularMovies();
    };
  }, []);

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="w-full h-[550px] bg-gradient-to-r from-black absolute"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="w-full p-6 md:p-8 absolute top-[25%]">
          <h1 className="font-bold text-3xl md:text-5xl mb-6">
            {movie?.title}
          </h1>
          <div className="text-white mb-6">
            <button className="px-6 py-2 bg-gray-300 text-black mr-4">
              Play
            </button>
            <button className="px-6 py-2 border border-gray-300 text-white hover:bg-gray-300 hover:text-black duration-200">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 mb-1">
            Released on {movie?.release_date}
          </p>
          <p className="md:max-w-[70%] lg:max-w-[50%] xl:max-w-[30%] text-gray-200">
            {overviewLength(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
