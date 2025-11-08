import React from 'react';
import GlobalApi from '../services/GlobalApi';
import { useState,useEffect } from 'react';

function MoviePage() {

      useEffect(() => {
            getMovieByGenreId();
        }, []);
    
        const getMovieByGenreId = () => {
            GlobalApi.getMovieByGenreId(genreId)
                .then(resp => {
                    if (resp?.data?.results) {
                        log(resp.data.results);
                    }
                })
                .catch(err => {
                    console.error("Error fetching movies:", err);
                    setMovieList([]);
                });
        };

  return (
    <div>MoviePage</div>
  )
}

export default MoviePage