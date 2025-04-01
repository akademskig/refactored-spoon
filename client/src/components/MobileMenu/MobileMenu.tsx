import { useState } from 'react';
import styles from './MobileMenu.module.scss';
import { BookMarked, Home, Menu, Newspaper, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { ICONS } from '../Sidebar/icons';
import { SIDEBAR_ITEMS } from '../Sidebar/sidebarItems';
import { useAuth } from '../../hooks/useAuth';
import { SearchBar } from '../Search/Search';

type Props = {
  categories: string[];
  onSearch: (query: string) => void;
};
const MobileMenu = ({ categories, onSearch }: Props) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button className={styles.trigger} onClick={() => setOpen(!open)}>
        <Menu />
      </button>

      {open && (
        <div className={styles.overlay}>
          <button className={styles.close} onClick={onClose}>
            <X size={30} />
          </button>

          <div className={styles.content}>
            <Logo externalStyles={styles.logo} />
            <div className={styles.seachWrapper}>
              <SearchBar onSearch={onSearch} />
            </div>
            <div className={styles.grid}>
              <NavLink
                to={SIDEBAR_ITEMS.home.route}
                className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
                onClick={onClose}
              >
                <Home />
              </NavLink>
              {categories.map((c) => (
                <NavLink
                  to={`category/${c}`}
                  key={c}
                  className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
                  onClick={onClose}
                >
                  {ICONS[c] || <Newspaper />}
                </NavLink>
              ))}
              {user && (
                <NavLink
                  to={SIDEBAR_ITEMS.favorites.route}
                  className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
                  onClick={onClose}
                >
                  <BookMarked />
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
