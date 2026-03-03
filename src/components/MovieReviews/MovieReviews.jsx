import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/tmdbApi';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getReviews() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getReviews();
  }, [movieId]);

  if (isLoading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (reviews.length === 0) {
    return <p>We don't have any reviews for this movie.</p>;
  }

  return (
    <ul className={css.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.item}>
          <p className={css.author}>Author: {author}</p>
          <p className={css.content}>{content}</p>
        </li>
      ))}
    </ul>
  );
}
