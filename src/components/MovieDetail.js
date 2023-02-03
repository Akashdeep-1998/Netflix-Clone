import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import axios from "axios";
import Movie from "./Movie";

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

const Account = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [searchparams] = useSearchParams();
  const movieId = searchparams.get("id");
  const img = searchparams.get("img");
  const title = searchparams.get("title");
  const overview = searchparams.get("overview");
  const release_date = searchparams.get("release_date");

  const leftSlider = () => {
    let left = document.getElementById(`${"slideShow"}`);
    left.scrollLeft = left.scrollLeft - 500;
  };
  const rightSlider = () => {
    let right = document.getElementById(`${"slideShow"}`);
    right.scrollLeft = right.scrollLeft + 500;
  };

  useEffect(() => {
    const recommendedMovies = async () => {
      const result = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      );
      console.log(result.data.results);
      if (result.data.results.length !== 0) {
        setMovies(
          result.data.results.filter((movies) => movies.backdrop_path !== null)
        );
      } else {
        setError(true);
        return;
      }
    };
    recommendedMovies();
  }, [movieId]);

  return (
    <>
      <div className="w-full h-[450px] text-white">
        <div className="w-full h-full">
          <div className="w-full h-[450px] bg-gradient-to-r from-black/70 absolute"></div>
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${img}`}
            alt="Poster"
          />
          <div className="w-full p-4 md:p-8 absolute top-[18%]">
            <h1 className="font-bold text-3xl md:text-5xl mb-6">{title}</h1>

            <p className="text-white mb-1">
              <b>Released on: </b>
              {release_date}
            </p>
            <p className="text-sm sm:text-base md:max-w-[70%] text-gray-200">
              <b>Overview:</b> {overview}
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-white font-bold md:text-xl p-4">Recommended</h2>
      {error && (
        <h1 className=" text-gray-400 p-4">No recommended movies found.</h1>
      )}

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
            <Movie
              key={movie.id}
              id={movie.id}
              img={movie.backdrop_path}
              title={movie.title}
              release_date={movie.release_date}
              overview={movie.overview}
            />
          ))}
        </div>
        <AiFillRightCircle
          className="text-white absolute z-10 right-0 opacity-20 hover:opacity-90 cursor-pointer hidden group-hover:block"
          size={40}
          onClick={rightSlider}
        />
      </div>
    </>
  );
};

export default Account;
