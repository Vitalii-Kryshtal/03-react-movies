import { useState } from 'react';
import fetchMovies from '../../services/movieService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import type { Movie } from '../../types/movie';
import toast from 'react-hot-toast';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const searchMovie = async (query: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const newMovies = await fetchMovies(query);

      if (newMovies.length === 0) {
        toast.error('No movies found for your request.');
      }

      setMovies(newMovies);
    } catch {
      setError('Failed to fetch movies.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectMovie = (movie: Movie): void => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setSelectedMovie(null);
    setModalOpen(false);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={searchMovie} />
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      <MovieGrid movies={movies} onSelect={selectMovie} />
      {modalOpen && selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
}
