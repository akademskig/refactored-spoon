import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/main.scss';
import { SIDEBAR_ITEMS } from './components/Sidebar/sidebarItems';
import Layout from './components/Layout/Layout';
import AuthGuard from './utils/AuthGuard';
import Favorites from './pages/Favorites/Favorites';
import Home from './pages/Main/Main';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';

const AppRoutes = () => {
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

export default AppRoutes;
