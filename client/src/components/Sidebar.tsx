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
} from 'lucide-react';
import styles from '../styles/sidebar.module.scss';

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
};

type Props = {
  categories: string[];
  selected: string;
  onSelect: (c: string) => void;
};

const toUppercase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Sidebar = ({ categories, selected, onSelect }: Props) => {
  return (
    <aside className={styles.sidebar}>
      {categories.map((c) => (
        <button key={c} className={selected === c ? styles.active : ''} onClick={() => onSelect(c)}>
          {ICONS[c] || <Newspaper />}
          {toUppercase(c)}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
