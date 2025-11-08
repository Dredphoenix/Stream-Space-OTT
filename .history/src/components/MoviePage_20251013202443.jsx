// src/pages/MoviePage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

const API_KEY = "fe7c47a9cc8ef3d54feae3fde6f2345e";

export default function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    if (!id) return;

    async function fetchMovie() {
      try {
        // Fetch movie details with videos
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
        );
        if (!res.ok) throw new Error("Movie not found");
        const data = await res.json();
        setMovie(data);

        // Find trailer
        const trailerVideo = data.videos?.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailer(trailerVideo?.key);

        // Fetch similar movies
        const simRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
        );
        if (!simRes.ok) throw new Error("Similar movies not found");
        const simData = await simRes.json();
        setSimilar(simData.results || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovie();
  }, [id]);

  if (!movie) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Player */}
      <div className="relative w-full h-[70vh] bg-black">
        {trailer ? (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            controls
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover opacity-70"
          />
        )}

        <div className="absolute bottom-0 p-8 bg-gradient-to-t from-black to-transparent w-full">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-300 mt-2 max-w-3xl">{movie.overview}</p>
          <div className="mt-3 text-sm text-gray-400">
            ⭐ {movie.vote_average?.toFixed(1)} | Released: {movie.release_date}
          </div>
          <div className="mt-4 flex gap-3">
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold">
              Watch Now
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg">
              + Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">More Like This</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {similar?.map((m) => (
            <div
              key={m.id}
              className="cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => navigate(`/movie/${m.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                alt={m.title}
                className="rounded-lg"
              />
              <p className="mt-2 text-sm text-gray-300 truncate">{m.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
