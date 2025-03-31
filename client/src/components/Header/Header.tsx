import { useState, useCallback } from 'react';
import styles from './Header.module.scss';
import { LogIn, LogOut, Search } from 'lucide-react';
import { useModal } from '../../hooks/useModal';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../Logo/Logo';
import { ModalViewEnum } from '../Modal/ModalViewEnum';

type Props = {
  onSearch: (query: string) => void;
  clearBookmarks: () => void;
};

const Header = ({ onSearch, clearBookmarks }: Props) => {
  const [input, setInput] = useState('');
  const { open } = useModal();
  const { user, logout } = useAuth();
  // Handle input change with useCallback for optimization
  const handleSetInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);
      if (value.trim() === '') {
        onSearch('');
      }
    },
    [onSearch],
  );

  const handleLogout = useCallback(() => {
    logout();
    clearBookmarks();
  }, [logout, clearBookmarks]);

  // Handle form submission with useCallback
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(input.trim());
    },
    [onSearch, input],
  );

  return (
    <header className={styles.header}>
      <Logo />
      <form className={styles.searchWrapper} onSubmit={handleSubmit}>
        <span className={styles.searchIcon}>
          <Search />
        </span>
        <input type="text" placeholder="Search news" value={input} onChange={handleSetInput} />
        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
      </form>
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
      </div>
    </header>
  );
};

export default Header;
