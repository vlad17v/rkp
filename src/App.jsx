import { useState } from 'react';
import HomePage from './pages/HomePage';
import NavDrawer from './components/NavDrawer';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen  = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <>
      <HomePage
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
      />
      <NavDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      />
    </>
  );
}

export default App;