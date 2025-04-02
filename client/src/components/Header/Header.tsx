import { useCallback } from 'react';
import styles from './Header.module.scss';
import { LogIn, LogOut } from 'lucide-react';
import { useModal } from '../../hooks/useModal';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../Logo/Logo';
import { ModalViewEnum } from '../Modal/ModalViewEnum';
import MobileMenu from '../MobileMenu/MobileMenu';
import { SearchBar } from '../Search/Search';

type Props = {
  onSearch: (query: string) => void;
  clearBookmarks: () => void;
  categories: string[];
};

const Header = ({ onSearch, clearBookmarks, categories }: Props) => {
  const { open } = useModal();
  const { user, logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
    clearBookmarks();
  }, [logout, clearBookmarks]);

  return (
    <header className={styles.header}>
      <Logo />
      <SearchBar onSearch={onSearch} />
      <div className={styles.userMenu}>
        {!user ? (
          <button className={styles.authBtn} onClick={() => open(ModalViewEnum.SIGNIN)}>
            <LogIn />
          </button>
        ) : (
          <>
            <div className={styles.userMessage}>{user.firstName}</div>
            <button className={styles.authBtn} onClick={handleLogout}>
              <LogOut />
            </button>
          </>
        )}
        <MobileMenu categories={categories} onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;
