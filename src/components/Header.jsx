import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header({ onMenuOpen, title }) {
  return (
    <AppBar position="static" elevation={0} sx={{
      bgcolor: '#FFE4D6',
      borderRadius: '28px',
      mb: 2,
    }}>
      <Toolbar>
        <IconButton edge="start" onClick={onMenuOpen} sx={{ color: '#1a1a1a' }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{
          flexGrow: 1, textAlign: 'center', fontWeight: 'bold', color: '#1a1a1a',
        }}>
          {title ?? 'Website with cats'}
        </Typography>

        <IconButton
          onClick={() => console.log('user')}
          sx={{
            width: 36,
            height: 36,
            border: '1.5px solid #3E2723',
            color: '#3E2723',
            p: 0,
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 26 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;