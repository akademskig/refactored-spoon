type Props = {
  categories: string[];
  selected: string;
  onSelect: (c: string) => void;
};

const Sidebar = ({ categories, selected, onSelect }: Props) => {
  return (
    <aside className="sidebar">
      <h2>News Reader</h2>
      <nav>
        <ul>
          {categories.map((c) => (
            <li key={c}>
              <button
                className={selected === c ? 'active' : ''}
                onClick={() => onSelect(c)}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
