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
import { NavLink, useParams } from 'react-router-dom';
import { ALL_CATEGORIES, FAVORITES } from '../constants';

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
  const selectedCategory = slug ? decodeURIComponent(slug) : ALL_CATEGORIES;
  return (
    <aside className={styles.sidebar}>
      <nav>
        <NavLink to={'/home'}>
          <button className={selectedCategory === ALL_CATEGORIES ? styles.active : ''}>
            <Home />
            Home
          </button>
        </NavLink>
        {categories.map((c) => (
          <NavLink to={`category/${c}`} key={c}>
            <button key={c} className={selectedCategory === c ? styles.active : ''}>
              {ICONS[c] || <Newspaper />}
              {toUppercase(c)}
            </button>
          </NavLink>
        ))}
        <NavLink to={'favorites'}>
          <button className={selectedCategory === FAVORITES ? styles.active : ''}>
            <BookMarked />
            Favorites
          </button>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
