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
  const rating = parseFloat(searchparams.get("rating"));

  console.log("MovieDetail.js", typeof parseInt(rating));

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
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
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
    return () => {
      recommendedMovies();
    };
  }, [movieId, rating]);

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
          <div className="text-sm sm:text-base w-full p-4 md:p-8 absolute top-[18%]">
            <h1 className="font-bold text-3xl md:text-5xl mb-6">{title}</h1>

            <p className="text-gray-300 mb-1">
              <b>Released:&nbsp;&nbsp;</b>
              {release_date}
            </p>
            <p className="text-gray-300 mb-1">
              <b>Rating:&nbsp;&nbsp;</b>
              {rating.toFixed(1)}/10
            </p>
            <p className="md:max-w-[70%] text-gray-200">
              <b>Overview:&nbsp;&nbsp;</b>
              {overview}
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-white font-bold md:text-xl p-4">Similar Movies</h2>
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
              overview={movie.overview}
              rating={movie.vote_average}
              release_date={movie.release_date}
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
