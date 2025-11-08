import './App.css'
import Header from './components/Header'
import ThreeDCarousel from './components/ThreeDCarousel'
import ProductionHouse from './components/ProductionHouse'
import GenreMovieList from './components/GenreMovieList';
import MoviePage from './components/MoviePage';

function App() {


  return (
    <div>
    <Header/>
    <ThreeDCarousel/>
    <ProductionHouse/>
    <GenreMovieList/>
    <MoviePage
    </div>
  )
}

export default App
