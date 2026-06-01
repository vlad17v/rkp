import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [profile, setProfile] = useState({
    fullName: 'Surname Name Patronymic',
    login: 'catlover2004',
  });

  const value = {
    drawerOpen,
    openDrawer:  () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    profile,
    setProfile,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}