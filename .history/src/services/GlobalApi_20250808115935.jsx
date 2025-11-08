
import axios from "axios";

const API_KEY = "fe7c47a9cc8ef3d54feae3fde6f2345e"; // paste your TMDB API key here
const BASE_URL = "https://api.themoviedb.org/3";
const movieByGenreBaseURL='https://api.themoviedb.org/3/discover/movie?api_key=2ec0d66f5bdf1dd12eefa0723f1479cf';

const trendingMovies=axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);

  const getMovieByGenreId=(id)=>
    axios.get(movieByGenreBaseURL+"&with_genres="+id)


export default{
    trendingMovies,
    getMovieByGenreId
}

