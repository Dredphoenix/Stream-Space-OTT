import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../services/GlobalApi'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"
const screenWidth = window.innerWidth

function Slider() {

  const [movieList, setMovieList] = useState([])
  const elementRef = useRef()

  useEffect(() => {
    getTrendingMovies()
  }, [])

  const getTrendingMovies = () => {
    GlobalApi.trendingMovies.then(resp => {
      setMovieList(resp.data.results)
    })
  }

  const sliderRight = (element) => {
    element.scrollLeft += screenWidth
  }

  const sliderLeft = (element) => {
    element.scrollLeft -= screenWidth
  }

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <AiOutlineLeft
        className='hidden md:block text-[50px] font-light absolute mx-8 mt-[150px] cursor-pointer z-10'
        onClick={() => sliderLeft(elementRef.current)}
      />

      <AiOutlineRight
        className='hidden md:block text-[50px] absolute mx-8 mt-[150px] cursor-pointer right-0 z-10'
        onClick={() => sliderRight(elementRef.current)}
      />

      <div
        className="flex overflow-x-auto w-full h-full scrollbar-hide scroll-smooth"
        ref={elementRef}
      >
        {movieList.map((item, index) => (
          <img
            key={index}
            src={IMAGE_BASE_URL + item.backdrop_path}
            className="min-w-[100vw] h-full object-cover object-left-top"
            alt="movie"
          />
        ))}
      </div>
    </div>
  )
}

export default Slider

