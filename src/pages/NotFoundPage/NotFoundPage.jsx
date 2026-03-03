import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 1500);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <section className={css.section}>
      <h1 className={css.title}>404</h1>
      <p>Page not found. Redirecting to home page...</p>
      <Link to="/" className={css.link}>
        Go to home page
      </Link>
    </section>
  );
}
