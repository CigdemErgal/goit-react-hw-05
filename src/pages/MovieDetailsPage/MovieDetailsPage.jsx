import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails, getImageUrl } from '../../services/tmdbApi';
import css from './MovieDetailsPage.module.css';

function getNavLinkClassName({ isActive }) {
  return isActive ? `${css.link} ${css.active}` : css.link;
}

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovie();
  }, [movieId]);

  return (
    <section className={css.section}>
      <Link to={backLinkRef.current} className={css.back}>
        Go back
      </Link>

      {isLoading && <p>Loading movie details...</p>}
      {error && <p>Error: {error}</p>}

      {movie && (
        <>
          <div className={css.wrapper}>
            {movie.poster_path ? (
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                width="300"
                className={css.poster}
              />
            ) : (
              <div className={css.posterPlaceholder}>No Poster</div>
            )}
            <div className={css.info}>
              <h1 className={css.title}>{movie.title}</h1>
              <p>User score: {Math.round((movie.vote_average ?? 0) * 10)}%</p>
              <h2 className={css.subtitle}>Overview</h2>
              <p>{movie.overview}</p>
              <h2 className={css.subtitle}>Genres</h2>
              <p>{movie.genres?.map((genre) => genre.name).join(', ')}</p>
            </div>
          </div>

          <div className={css.additional}>
            <h2 className={css.subtitle}>Additional information</h2>
            <ul className={css.links}>
              <li>
                <NavLink to="cast" className={getNavLinkClassName}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={getNavLinkClassName}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      )}

      <Outlet />
    </section>
  );
}
