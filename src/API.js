const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

const requests = {
  popularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  topRatedMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  upcomingMovies: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  actionMovies: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=action&language=en-US&page=1`,
  horrorMovies: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=horror&language=en-US&page=1`,
};

export default requests;
