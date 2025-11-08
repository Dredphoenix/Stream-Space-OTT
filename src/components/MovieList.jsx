import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from './../services/GlobalApi'
import MovieCard from './MovieCard';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import HrMovieCard from './HrMovieCard';

function MovieList({ genreId, index_ }) {
    const [movieList, setMovieList] = useState([]);
    const elementRef = useRef(null);

    useEffect(() => {
        getMovieByGenreId();
    }, []);

    const getMovieByGenreId = () => {
        GlobalApi.getMovieByGenreId(genreId)
            .then(resp => {
                if (resp?.data?.results) {
                    setMovieList(resp.data.results);
                }
            })
            .catch(err => {
                console.error("Error fetching movies:", err);
                setMovieList([]);
            });
    };

    const slideRight = (element) => {
        element.scrollBy({
            left: 500,
            behavior: "smooth"
        });
    };
    const slideLeft = (element) => {
        element.scrollBy({
            left: -500,
            behavior: "smooth"
        });
    };

    return (
        <div className='relative'>
            {/* Left Scroll Button */}
            <IoChevronBackOutline
                onClick={() => slideLeft(elementRef.current)}
                className={`text-[50px] text-white p-2 z-10 cursor-pointer 
                    hidden md:block absolute
                    ${index_ % 3 === 0 ? 'mt-[80px]' : 'mt-[150px]'}`}
            />

            {/* Movie List */}
            <div
                ref={elementRef}
                className='flex overflow-x-auto gap-8 scrollbar-none scroll-smooth pt-4 px-3 pb-4 scrollbar-hide'
            >
                {movieList?.map((item, index) => (
                    index_ % 3 === 0
                        ? <HrMovieCard key={item.id || `${genreId}-${index}`} movie={item} />
                        : <MovieCard key={item.id || `${genreId}-${index}`} movie={item} />
                ))}
            </div>

            {/* Right Scroll Button */}
            <IoChevronForwardOutline
                onClick={() => slideRight(elementRef.current)}
                className={`text-[50px] text-white hidden md:block p-2 cursor-pointer z-10 top-0
                    absolute right-0 
                    ${index_ % 3 === 0 ? 'mt-[80px]' : 'mt-[150px]'}`}
            />
        </div>
    );
}

export default MovieList;
