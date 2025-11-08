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


// import React, { useEffect, useRef, useState } from 'react'
// import GlobalApi from '../services/GlobalApi'
// import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"

// function Slider() {
//   const [movieList, setMovieList] = useState([])
//   const elementRef = useRef()
//   const scrollAmount = 320 // same as card width + margin

//   useEffect(() => {
//     getTrendingMovies()
//   }, [])

//   const getTrendingMovies = () => {
//     GlobalApi.trendingMovies.then(resp => {
//       const movies = resp.data.results
//       // Duplicate for infinite loop
//       setMovieList([...movies, ...movies])
//     })
//   }

//   const sliderRight = () => {
//     if (elementRef.current) {
//       elementRef.current.scrollLeft += scrollAmount
//     }
//   }

//   const sliderLeft = () => {
//     if (elementRef.current) {
//       elementRef.current.scrollLeft -= scrollAmount
//     }
//   }

//   // Auto-scroll logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!elementRef.current) return

//       const container = elementRef.current
//       if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
//         container.scrollLeft = 0 // Reset for infinite loop
//       } else {
//         container.scrollLeft += scrollAmount
//       }
//     }, 3000) // Every 3s

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="relative w-full h-[80vh] overflow-hidden">
//       <AiOutlineLeft
//         className='hidden md:block text-[50px] absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer'
//         onClick={sliderLeft}
//       />

//       <AiOutlineRight
//         className='hidden md:block text-[50px] absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer'
//         onClick={sliderRight}
//       />

//       <div
//         ref={elementRef}
//         className="flex gap-4 px-4 overflow-x-auto scroll-smooth scrollbar-hide h-full items-center"
//       >
//         {movieList.map((item, index) => (
//           <div key={index} className="min-w-[300px] h-[70vh] rounded-lg overflow-hidden shadow-lg flex-shrink-0">
//             <img
//               src={IMAGE_BASE_URL + item.backdrop_path}
//               alt={item.title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Slider
