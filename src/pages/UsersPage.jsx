import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router';
import { PATHS } from '../routes/paths';
import { useApi } from '../hooks/useApi';

const API_URL = 'http://localhost:3001';

function UsersPage() {
  const navigate = useNavigate();
  const { data: users, setData: setUsers, loading, error } = useApi('/users');

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Не удалось удалить');
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F4A261', p: 2 }}>
      <Box sx={{
        bgcolor: '#FFE4D6', borderRadius: '28px', mb: 2,
        display: 'flex', alignItems: 'center', px: 2, py: 1,
      }}>
        <Button onClick={() => navigate(PATHS.HOME)} sx={{ color: '#1a1a1a', minWidth: 0 }}>
          ←
        </Button>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
          Users
        </Typography>
        <Box sx={{ width: 48 }} />
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: '#FFE4D6' }} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>
          Не удалось загрузить: {error}
        </Alert>
      )}

      {!loading && !error && (
        <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: 'none', bgcolor: '#FFE4D6' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Full Name', 'Login', 'Role', 'Actions'].map(col => (
                  <TableCell key={col} sx={{ fontWeight: 'bold', color: '#3E2723', bgcolor: '#FFCDB2' }}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} sx={{ '&:hover': { bgcolor: '#fff0e8' } }}>
                  <TableCell sx={{ color: '#1a1a1a' }}>{user.fullName}</TableCell>
                  <TableCell sx={{ color: '#6D4C41' }}>{user.login}</TableCell>
                  <TableCell sx={{ color: '#6D4C41' }}>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderRadius: '20px', borderColor: '#7D5147',
                        color: '#7D5147', textTransform: 'none',
                        '&:hover': { bgcolor: '#FFCDB2', borderColor: '#7D5147' },
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default UsersPage;