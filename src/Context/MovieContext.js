import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const movieContext = createContext();

const MovieContext = (props) => {
  const ApiKey = "9fb406e57dd0cb627ea1fc037206ba90";

  const [selectedMovie, setSelectedMovie] = useState({});

  const fetchRecommendedMovies = async () => {
    const recommendedMovies = await axios.get(
      `https://api.themoviedb.org/3/movie/${selectedMovie?.id}/recommendations?api_key=${ApiKey}&language=en-US&page=1`
      );
      console.log(recommendedMovies.data)
  };

//   useEffect(() => {
//     fetchRecommendedMovies();
//     return () => {
//       fetchRecommendedMovies();
//     };
//   }, []);

  return (
    <movieContext.Provider
      value={{
        selectedMovie: selectedMovie,
        setSelectedMovie: setSelectedMovie,
      }}
    >
      {props.children}
    </movieContext.Provider>
  );
};

export default MovieContext;
