import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { fetchTrendingMovies } from '../../services/tmdbApi';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getTrendingMovies();
  }, []);

  return (
    <section className={css.section}>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <p>Loading movies...</p>}
      {error && <p>Error: {error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </section>
  );
}
