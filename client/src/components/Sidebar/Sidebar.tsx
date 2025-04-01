import { Home, Newspaper, BookMarked } from 'lucide-react';
import styles from './Sidebar.module.scss';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { SIDEBAR_ITEMS } from './sidebarItems';
import { useAuth } from '../../hooks/useAuth';
import { ICONS } from './icons';
import { capitalize } from '../../utils/toUppercase';

type Props = {
  categories: string[];
};

const Sidebar = ({ categories }: Props) => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <nav>
        <NavLink to={SIDEBAR_ITEMS.home.route}>
          <button className={pathname === SIDEBAR_ITEMS.home.route ? styles.active : ''}>
            <Home />
            {capitalize(SIDEBAR_ITEMS.home.name)}
          </button>
        </NavLink>
        {categories.map((c) => (
          <NavLink to={`category/${c}`} key={c}>
            <button key={c} className={slug === c ? styles.active : ''}>
              {ICONS[c] || <Newspaper />}
              {capitalize(c)}
            </button>
          </NavLink>
        ))}
        {user && (
          <NavLink to={SIDEBAR_ITEMS.favorites.route}>
            <button className={pathname === SIDEBAR_ITEMS.favorites.route ? styles.active : ''}>
              <BookMarked />
              {capitalize(SIDEBAR_ITEMS.favorites.name)}
            </button>
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
