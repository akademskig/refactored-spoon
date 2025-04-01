import { JSX } from 'react';
import {
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
  Home,
  Newspaper,
  BookMarked,
} from 'lucide-react';

export const ICONS: Record<string, JSX.Element> = {
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
