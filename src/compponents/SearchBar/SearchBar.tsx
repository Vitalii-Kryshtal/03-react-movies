import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData): void => {
    const filmQuery = formData.get('query') as string;
    if (!filmQuery) {
      toast.error('Please enter your search query.');
      return;
    }
    onSubmit(filmQuery);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <header className={css.header}>
        <div className={css.container}>
          <a
            className={css.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>
          <form action={handleSubmit} className={css.form}>
            <input
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
    </>
  );
}
