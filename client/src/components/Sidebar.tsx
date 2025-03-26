import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>News Reader</h2>
      <nav>
        <ul>
          <li><NavLink to="/">All Articles</NavLink></li>
          <li><NavLink to="/favorites">Favorites</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
