import { useState, useCallback } from 'react';
import styles from '../styles/header.module.scss';
import { Search } from 'lucide-react';

type Props = {
  onSearch: (query: string) => void;
};

const Header = ({ onSearch }: Props) => {
  const [input, setInput] = useState('');

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
      <h1 className={styles.logo}>
        My<span>News</span>
      </h1>
      <form className={styles.searchWrapper} onSubmit={handleSubmit}>
        <span className={styles.searchIcon}>
          <Search />
        </span>
        <input type="text" placeholder="Search news" value={input} onChange={handleSetInput} />
        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;
