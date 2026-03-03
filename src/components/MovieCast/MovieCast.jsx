import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits, getImageUrl } from '../../services/tmdbApi';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCast() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMovieCredits(movieId);
        setCast(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getCast();
  }, [movieId]);

  if (isLoading) {
    return <p>Loading cast...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (cast.length === 0) {
    return <p>We don't have cast information for this movie.</p>;
  }

  return (
    <ul className={css.list}>
      {cast.map(({ id, name, character, profile_path: profilePath }) => (
        <li key={id} className={css.item}>
          {profilePath ? (
            <img src={getImageUrl(profilePath)} alt={name} width="120" className={css.image} />
          ) : (
            <div className={css.placeholder}>No Image</div>
          )}
          <p className={css.name}>{name}</p>
          <p className={css.text}>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
}
