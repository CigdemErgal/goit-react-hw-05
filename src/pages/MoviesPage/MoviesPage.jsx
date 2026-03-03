import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMoviesByQuery } from '../../services/tmdbApi';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    async function getMovies() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMoviesByQuery(query);
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, [query]);

  function handleSubmit(event) {
    event.preventDefault();
    const value = event.currentTarget.elements.query.value.trim();

    if (!value) {
      setSearchParams({});
      return;
    }

    setSearchParams({ query: value });
  }

  return (
    <section className={css.section}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          defaultValue={query}
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>

      {isLoading && <p>Loading movies...</p>}
      {error && <p>Error: {error}</p>}
      {query && movies.length > 0 && <MovieList movies={movies} />}
      {query && !isLoading && !error && movies.length === 0 && <p>No movies found.</p>}
    </section>
  );
}
