import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import './styles/main.scss';
import Layout from './components/Layout';
import Favorites from './pages/Favorites';
import VerifyEmail from './pages/VerifyEmail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="category/:slug" element={<Home />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
      <Route path="/verify/:token" element={<VerifyEmail />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default App;
