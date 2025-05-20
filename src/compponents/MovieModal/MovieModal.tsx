import type { Movie } from '../../types/movie';
import { createPortal } from 'react-dom';
import css from './MovieModal.module.css';
import { useEffect } from 'react';

interface MovieModalProps {
  onClose: () => void;
  movie: Movie[];
}

export default function MovieModal({ onClose, movie }: MovieModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div onClick={handleBackdropClick} className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button onClick={onClose} className={css.closeButton} aria-label="Close modal">
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie[0].poster_path}`}
          alt={movie[0].title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie[0].title}</h2>
          <p>{movie[0].overview}</p>
          <p>
            <strong>Release Date:</strong> {movie[0].release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie[0].vote_average}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
