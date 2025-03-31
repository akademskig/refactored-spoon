import { JSX } from 'react';
import {
  Home,
  Newspaper,
  Briefcase,
  HeartPulse,
  FlaskConical,
  Monitor,
  Volleyball,
  Brush,
  Clapperboard,
  Earth,
  MessageSquare,
  Podcast,
  BookMarked,
} from 'lucide-react';
import styles from '../styles/sidebar.module.scss';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../utils/sidebarItems';

const ICONS: Record<string, JSX.Element> = {
  home: <Home />,
  general: <Newspaper />,
  business: <Briefcase />,
  health: <HeartPulse />,
  science: <FlaskConical />,
  sports: <Volleyball />,
  technology: <Monitor />,
  arts: <Brush />,
  movies: <Clapperboard />,
  world: <Earth />,
  opinion: <MessageSquare />,
  podcasts: <Podcast />,
  favorites: <BookMarked />,
};

type Props = {
  categories: string[];
};

const toUppercase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Sidebar = ({ categories }: Props) => {
  const { slug } = useParams();
  const { pathname } = useLocation();

  return (
    <aside className={styles.sidebar}>
      <nav>
        <NavLink to={SIDEBAR_ITEMS.home.route}>
          <button className={pathname === SIDEBAR_ITEMS.home.route ? styles.active : ''}>
            <Home />
            {toUppercase(SIDEBAR_ITEMS.home.name)}
          </button>
        </NavLink>
        {categories.map((c) => (
          <NavLink to={`category/${c}`} key={c}>
            <button key={c} className={slug === c ? styles.active : ''}>
              {ICONS[c] || <Newspaper />}
              {toUppercase(c)}
            </button>
          </NavLink>
        ))}
        <NavLink to={SIDEBAR_ITEMS.favorites.route}>
          <button className={pathname === SIDEBAR_ITEMS.favorites.route ? styles.active : ''}>
            <BookMarked />
            {toUppercase(SIDEBAR_ITEMS.favorites.name)}
          </button>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
