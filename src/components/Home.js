import React, { useContext } from "react";
import Genres from "./Genres";
import Main from "./Main";
import requests from "../API";
import { authContext } from "../Context/AuthContext";

const Home = () => {
  const { user } = useContext(authContext);

  console.log("Home.js", user);
console.log("API KEY:- ",process.env.REACT_APP_MOVIE_API_KEY);

  return (
    <div>
      <Main />
      <>
        <Genres
          genreId="1"
          title={"Upcoming"}
          fetchUrl={requests.upcomingMovies}
        />
        <Genres
          genreId="2"
          title={"Popular"}
          fetchUrl={requests.popularMovies}
        />
        <Genres
          genreId="3"
          title={"Top Rated"}
          fetchUrl={requests.topRatedMovies}
        />
        <Genres genreId="4" title={"Action"} fetchUrl={requests.actionMovies} />
        <Genres genreId="5" title={"Horror"} fetchUrl={requests.horrorMovies} />
      </>
    </div>
  );
};

export default Home;
