import { Home, Newspaper, BookMarked } from 'lucide-react';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { SIDEBAR_ITEMS } from './sidebarItems';
import { useAuth } from '../../hooks/useAuth';
import { ICONS } from './icons';
import { capitalize } from '../../utils/toUppercase';

type Props = {
  categories: string[];
};

const Sidebar = ({ categories }: Props) => {
  const { user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <nav>
        <NavLink
          to={SIDEBAR_ITEMS.home.route}
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
        >
          <Home />
          {capitalize(SIDEBAR_ITEMS.home.name)}
        </NavLink>
        {categories.map((c) => (
          <NavLink
            to={`category/${c}`}
            key={c}
            className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
          >
            {ICONS[c] || <Newspaper />}
            {capitalize(c)}
          </NavLink>
        ))}
        {user && (
          <NavLink
            to={SIDEBAR_ITEMS.favorites.route}
            className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
          >
            <BookMarked />
            {capitalize(SIDEBAR_ITEMS.favorites.name)}
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
