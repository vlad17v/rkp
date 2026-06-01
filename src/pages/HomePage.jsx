import { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import Header from '../components/Header';
import CatCard from '../components/CatCard';
import AddCatDialog from '../components/AddCatDialog';
import { useApi } from '../hooks/useApi';

const API_URL = 'http://localhost:3001';

function HomePage() {
  const { data: cats, setData: setCats, loading, error } = useApi('/cats');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddCat = async (newCat) => {
    try {
      const response = await fetch(`${API_URL}/cats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat),
      });
      if (!response.ok) throw new Error('Не удалось добавить карточку');
      const created = await response.json();
      setCats(prev => [...prev, created]);
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      bgcolor: '#F4A261',
      p: 2,
      boxSizing: 'border-box',
    }}>
      <Header />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: '#FFE4D6' }} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>
          Не удалось загрузить данные: {error}
        </Alert>
      )}

      {!loading && !error && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {cats.map(cat => (
            <Box
              key={cat.id}
              sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' }, display: 'flex' }}
            >
              <CatCard
                header={cat.header}
                subhead={cat.subhead}
                title={cat.title}
                subtitle={cat.subtitle}
                text={cat.text}
              />
            </Box>
          ))}
        </Box>
      )}

      <Fab
        onClick={() => setDialogOpen(true)}
        sx={{
          position: 'fixed', bottom: 24, right: 24,
          bgcolor: '#FFE4D6', borderRadius: '14px',
          width: 52, height: 52,
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          '&:hover': { bgcolor: '#FFCDB2' },
        }}
      >
        <AddIcon sx={{ fontSize: 28, color: '#F4A261' }} />
      </Fab>

      <AddCatDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={handleAddCat}
      />
    </Box>
  );
}

export default HomePage;