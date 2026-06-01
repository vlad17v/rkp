import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router';
import { PATHS } from '../routes/paths';

const API_URL = 'http://localhost:3001';

// Вспомогательная функция — загружает профиль из json-server
async function fetchProfile() {
  const res = await fetch(`${API_URL}/profile`);
  if (!res.ok) throw new Error('Ошибка загрузки');
  return res.json();
}

function SettingsPage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading]  = useState(true);
  const [editing, setEditing]  = useState(false);
  const [formFullName, setFormFullName] = useState('');
  const [formLogin, setFormLogin]       = useState('');

  // GET /profile при монтировании компонента (раздел 8 day4)
  useEffect(() => {
    fetchProfile()
      .then(data => setProfile(data))
      .catch(() => setProfile({ fullName: 'Surname Name Patronymic', login: 'catlover2004' }))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = () => {
    setFormFullName(profile.fullName);
    setFormLogin(profile.login);
    setEditing(true);
  };

  // PUT /profile → затем GET /profile чтобы гарантированно получить актуальные данные
  const handleSave = async () => {
    try {
      await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: formFullName, login: formLogin }),
      });
      // После сохранения делаем свежий GET — берём данные как они есть в db.json
      const fresh = await fetchProfile();
      setProfile(fresh);
    } catch {
      // Если сервер недоступен — обновляем только локально
      setProfile({ fullName: formFullName, login: formLogin });
    }
    setEditing(false);
  };

  const handleCancel = () => setEditing(false);

  if (loading) return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F4A261', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress sx={{ color: '#FFE4D6' }} />
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F4A261', p: 2 }}>
      <Box sx={{
        bgcolor: '#FFE4D6', borderRadius: '28px', mb: 2,
        display: 'flex', alignItems: 'center', px: 2, py: 1,
      }}>
        <Button onClick={() => navigate(PATHS.HOME)} sx={{ color: '#1a1a1a', minWidth: 0, fontSize: '1.2rem' }}>
          ←
        </Button>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', color: '#1a1a1a' }}>
          Settings
        </Typography>
        <Box sx={{ width: 48 }} />
      </Box>

      <Card sx={{ bgcolor: '#FFE4D6', borderRadius: '16px', boxShadow: 'none', maxWidth: 500 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: '#FFCDB2', color: '#3E2723', fontWeight: 'bold', width: 48, height: 48 }}>
              {(profile.fullName || '?').charAt(0)}
            </Avatar>

            {editing ? (
              <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
                <TextField
                  label="Full Name"
                  size="small"
                  value={formFullName}
                  onChange={e => setFormFullName(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                />
                <TextField
                  label="Login"
                  size="small"
                  value={formLogin}
                  onChange={e => setFormLogin(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                />
              </Stack>
            ) : (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
                  {profile.fullName}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6D4C41' }}>
                  Login: {profile.login}
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {editing ? (
              <>
                <Button onClick={handleCancel} variant="outlined" sx={{
                  borderRadius: '20px', borderColor: '#7D5147',
                  color: '#3E2723', textTransform: 'none',
                }}>
                  Cancel
                </Button>
                <Button onClick={handleSave} variant="contained" sx={{
                  borderRadius: '20px', bgcolor: '#FFCDB2',
                  color: '#fff', boxShadow: 'none', textTransform: 'none',
                  '&:hover': { bgcolor: '#f5bda0', boxShadow: 'none' },
                }}>
                  Save
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} variant="outlined" sx={{
                borderRadius: '20px', borderColor: '#7D5147',
                color: '#3E2723', textTransform: 'none',
              }}>
                Edit
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SettingsPage;