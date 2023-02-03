import { React, useState, useEffect } from "react";
import axios from "axios";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

import Movie from "./Movie";

const Genres = ({ title, fetchUrl, genreId }) => {
  const [movies, setMovies] = useState([]);

  const leftSlider = () => {
    let left = document.getElementById(`${"slideShow" + genreId}`);
    left.scrollLeft = left.scrollLeft - 500;
  };
  const rightSlider = () => {
    let right = document.getElementById(`${"slideShow" + genreId}`);
    right.scrollLeft = right.scrollLeft + 500;
  };

  useEffect(() => {
    const fetchMovies = () => {
      axios
        .get(fetchUrl)
        .then((movieData) => {
          setMovies(movieData.data.results);
          // console.log(movieData);
        })
        .catch((err) => console.log(err));
    };
    fetchMovies();
    return () => {
      fetchMovies();
    };
  }, [fetchUrl]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <AiFillLeftCircle
          className="text-white absolute z-10 left-0 opacity-20 hover:opacity-90 cursor-pointer hidden group-hover:block"
          size={40}
          onClick={leftSlider}
        />
        <div
          id={"slideShow" + genreId}
          className="relative w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies?.map(
            (movie) =>
              movie.backdrop_path && (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  img={movie.backdrop_path}
                  overview={movie.overview}
                  rating={movie.vote_average}
                  release_date={movie.release_date}
                />
              )
          )}
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

export default Genres;
