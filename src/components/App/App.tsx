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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [seletedMovie, setSelectedMovie] = useState<Movie[]>([]);
  const searchMovie = async (value: string): Promise<void> => {
    const newMovies = (await fetchMovies(value)) as Movie[];
    if (newMovies.length === 0) {
      toast.error('No movies found for your request.');
      return;
    }
    setMovies(newMovies);
  };
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setSelectedMovie([]);
    setModalOpen(false);
  };
  const selectMovie = (id: number): void => {
    setSelectedMovie(movies.filter(movie => movie.id === id));
    openModal();
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={searchMovie} />
      <ErrorMessage />
      <Loader />
      <MovieGrid movies={movies} onSelect={selectMovie} />
      {modalOpen && <MovieModal movie={seletedMovie} onClose={closeModal} />}
    </div>
  );
}
