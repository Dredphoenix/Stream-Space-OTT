import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ThreeDCarousel from './components/ThreeDCarousel';
import ProductionHouse from './components/ProductionHouse';
import GenreMovieList from './components/GenreMovieList';
import MoviePage from './components/MoviePage';
import Home from './pages/Home'; // we will create this

function App() {npm run dev
  return (
    <div>
      <Header />

      <Routes>
        {/* Home page */}
        <Route 
          path="/" 
          element={
            <>
              <ThreeDCarousel />
              <ProductionHouse />
              <GenreMovieList />
            </>
          } 
        />

        {/* Movie page */}
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;
