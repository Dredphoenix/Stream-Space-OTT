import React, { useEffect, useRef, useState } from "react";
import GlobalApi from "../services/GlobalApi";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function ThreeDCarousel() {
  const [movieList, setMovieList] = useState([]);
  const [current, setCurrent] = useState(0);
  const progressRef = useRef();

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = () => {
    GlobalApi.trendingMovies
      .then((resp) => {
        // Take first 5 movies for the carousel
        const movies = resp.data.results.slice(0, 12).map((movie) => ({
          title: movie.title || movie.name,
          text: movie.overview || "No description available",
          image: IMAGE_BASE_URL + movie.backdrop_path,
          gradient: getRandomGradient(),
          rating: movie.vote_average,
          releaseDate: movie.release_date || movie.first_air_date,
          genres: movie.genre_ids, // You might want to map these to actual genre names
        }));
        setMovieList(movies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        // Fallback data if API fails
        setMovieList([
          {
            title: "Loading...",
            text: "Please wait while we fetch the latest movies.",
            image:
              "https://images.unsplash.com/photo-1489599577372-f97e8e97c9e4?auto=format&fit=crop&q=80",
            gradient: "from-gray-500/40 to-gray-600/40",
            rating: 0,
            releaseDate: "",
            genres: [],
          },
        ]);
      });
  };

  const getRandomGradient = () => {
    const gradients = [
      "from-violet-500/40 to-purple-500/40",
      "from-fuchsia-500/40 to-pink-500/40",
      "from-pink-500/40 to-rose-500/40",
      "from-blue-500/40 to-indigo-500/40",
      "from-emerald-500/40 to-teal-500/40",
      "from-amber-500/40 to-orange-500/40",
      "from-red-500/40 to-pink-500/40",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const next = () => setCurrent((prev) => (prev + 1) % movieList.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + movieList.length) % movieList.length);

  useEffect(() => {
    if (movieList.length > 0) {
      const interval = setInterval(() => next(), 6000);
      return () => clearInterval(interval);
    }
  }, [movieList.length]);

  useEffect(() => {
    if (progressRef.current && movieList.length > 0) {
      progressRef.current.style.width = `${
        ((current + 1) / movieList.length) * 100
      }%`;
    }
  }, [current, movieList.length]);

  // Show loading state if no movies yet
  if (movieList.length === 0) {
    return (
      <div className="relative w-full max-w-6xl mx-auto h-[600px] overflow-hidden bg-black rounded-2xl flex items-center justify-center">
        <div className="text-white text-xl">Loading movies...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[600px] overflow-hidden bg-black rounded-2xl">
      {/* Progress Bar */}
      {/* <div className="absolute top-4 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden z-20">
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 rounded-full"
        />
      </div> */}

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        ⟨
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        ⟩
      </button>

      {/* Carousel Container */}
      <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
        {movieList.map((movie, index) => {
          const isActive = index === current;
          const isNext = index === (current + 1) % movieList.length;
          const isPrev =
            index === (current - 1 + movieList.length) % movieList.length;

          let transform = "translateX(120%) rotateY(50deg) scale(0.8)"; // ✅ Added scale
          let opacity = 0;
          let zIndex = 1;
          let filter = "blur(4px)"; // ✅ Added blur effect

          if (isActive) {
            transform = "translateX(0) rotateY(0deg) scale(1)"; // ✅ Perfect scale
            opacity = 1;
            zIndex = 10;
            filter = "blur(0px)"; // ✅ No blur when active
          } else if (isPrev) {
            transform = "translateX(-100%) rotateY(-45deg)";
            opacity = 0.7;
            zIndex = 5;
          } else if (isNext) {
            transform = "translateX(100%) rotateY(45deg)";
            opacity = 0.7;
            zIndex = 5;
          }

          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              style={{
                transform,
                opacity,
                zIndex,
                filter, // ✅ Added filter property
                transformStyle: "preserve-3d",
              }}
            >
              <div className="w-full h-full p-4 sm:p-8">
                <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative group shadow-2xl">
                  <img
                    src={movie.image}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={movie.title}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1489599577372-f97e8e97c9e4?auto=format&fit=crop&q=80";
                    }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${movie.gradient} mix-blend-overlay`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Movie Rating Badge */}
                  {movie.rating > 0 && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-sm">
                      ⭐ {movie.rating.toFixed(1)}
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
                    <div className="transform transition-all duration-700 translate-y-0 opacity-100">
                      <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 leading-tight">
                        {movie.title}
                      </h3>
                      <p className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mb-3 line-clamp-3">
                        {movie.text}
                      </p>
                      {movie.releaseDate && (
                        <div className="text-gray-300 text-sm">
                          Release Date:{" "}
                          {new Date(movie.releaseDate).getFullYear()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {movieList.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
