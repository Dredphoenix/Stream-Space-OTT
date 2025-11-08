import React from 'react';
import GenreList from './../constant/GenreList';
import MovieList from './MovieList';

function GenreMovieList() {
  // Use the correct variable depending on whether GenreList is an array or object
  const genres = Array.isArray(GenreList) ? GenreList : GenreList.genres || [];

  return (
    <div>
      {genres.map((item, index) => index <= 4 && (
<div className='p-8 px-8 md:px-16'>
                <h2 className='text-[20px] text-white 
                font-bold scrollbar-hide'>{item.name}</h2> 
                <MovieList genreId={item.id} index_={index} />   
            </div>
      ))}
    </div>
  );
}

export default GenreMovieList;
