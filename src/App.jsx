import { Routes, Route } from 'react-router';
import { PATHS } from './routes/paths';
import { useApp } from './context/AppContext';

import HomePage     from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import UsersPage    from './pages/UsersPage';
import NavDrawer    from './components/NavDrawer';

function App() {
  const { drawerOpen, closeDrawer } = useApp();

  return (
    <>
      <Routes>
        <Route path={PATHS.HOME}      element={<HomePage />} />
        <Route path={PATHS.SETTINGS}  element={<SettingsPage />} />
        <Route path={PATHS.USERS}     element={<UsersPage />} />
        <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>

      <NavDrawer open={drawerOpen} onClose={closeDrawer} />
    </>
  );
}

function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100vh', bgcolor: '#F4A261',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <h1 style={{ color: '#3E2723' }}>404 — Страница не найдена</h1>
    </div>
  );
}

export default App;