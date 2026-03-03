import { Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../../services/tmdbApi';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }} className={css.link}>
            {movie.poster_path ? (
              <img
                className={css.poster}
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                loading="lazy"
              />
            ) : (
              <div className={css.placeholder}>No Poster</div>
            )}
            <p className={css.title}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
