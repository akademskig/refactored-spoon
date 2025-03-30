import { useState, useCallback } from 'react';
import styles from '../styles/header.module.scss';
import { LogIn, LogOut, Search } from 'lucide-react';
import { useAuthModal } from '../hooks/useAuthModal';
import Logo from './Logo';
import { ModalViewEnum } from '../types/ModalViewEnum';
import { useAuth } from '../hooks/useAuth';

type Props = {
  onSearch: (query: string) => void;
};

const Header = ({ onSearch }: Props) => {
  const [input, setInput] = useState('');
  const { open } = useAuthModal();
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
            <button className={styles.authBtn} onClick={logout}>
              <LogOut />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
