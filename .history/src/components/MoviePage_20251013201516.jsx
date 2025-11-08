import React from 'react';
import GlobalApi from '../services/GlobalApi';
import { useState,useEffect,useRef } from 'react';

function MoviePage() {
    const elementRef = useRef(null);

      useEffect(() => {
            getMovieByGenreId();
        }, []);
    
        const getMovieByGenreId = () => {
            GlobalApi.getMovieByGenreId()
                .then(resp => {
                    if (resp?.data?.results) {
                        console.log(resp.data.results);
                    }
                })
                .catch(err => {
                    console.error("Error fetching movies:", err);
                    // setMovieList([]);
                });
        };

  return (
    <div>MoviePage</div>
  )
}

export default MoviePage