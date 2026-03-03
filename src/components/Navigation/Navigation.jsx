import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

function getLinkClassName({ isActive }) {
  return isActive ? `${css.link} ${css.active}` : css.link;
}

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <p className={css.logo}>
          Cine<span>Wave</span>
        </p>
        <div className={css.menu}>
          <NavLink to="/" className={getLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/movies" className={getLinkClassName}>
            Movies
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
