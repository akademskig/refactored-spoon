import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import './styles/main.scss';
import Favorites from './pages/Favorites';
import VerifyEmail from './pages/VerifyEmail';
import { SIDEBAR_ITEMS } from './components/Sidebar/sidebarItems';
import Layout from './components/Layout/Layout';
import AuthGuard from './utils/AuthGuard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={SIDEBAR_ITEMS.home.route} element={<Home />} />
        <Route path="category/:slug" element={<Home />} />
        <Route
          path={SIDEBAR_ITEMS.favorites.route}
          element={
            <AuthGuard>
              <Favorites />
            </AuthGuard>
          }
        />
      </Route>
      <Route path="/verify/:token" element={<VerifyEmail />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default App;
