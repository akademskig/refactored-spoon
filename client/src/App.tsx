import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import './styles/main.scss';
import Layout from './components/Layout';
import Favorites from './pages/Favorites';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
