import { useCallback, useState } from 'react';
import styles from './Search.module.scss';
import { Search } from 'lucide-react';

type Props = {
  onSearch: (query: string) => void;
};
export const SearchBar = ({ onSearch }: Props) => {
  const [input, setInput] = useState('');
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
    <form className={styles.searchWrapper} onSubmit={handleSubmit}>
      <span className={styles.searchIcon}>
        <Search />
      </span>
      <input type="text" placeholder="Search news" value={input} onChange={handleSetInput} />
      <button type="submit" className={styles.searchBtn}>
        Search
      </button>
    </form>
  );
};
