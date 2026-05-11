import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';

const navItems = [
  { label: 'Home',     icon: <HomeIcon /> },
  { label: 'Settings', icon: <SettingsIcon /> },
  { label: 'Users',    icon: <PeopleIcon /> },
];

function NavDrawer({ open, onClose }) {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: '#FFE4D6',
          width: 220,
          pt: 2,
          border: 'none',
          borderRadius: '0 20px 20px 0',
          boxShadow: '4px 0 16px rgba(0,0,0,0.08)',
        },
      }}
    >
      <Box sx={{ px: 2, pb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
          Menu
        </Typography>
      </Box>

      <List sx={{ px: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={onClose}
              sx={{
                borderRadius: '12px',
                bgcolor: 'transparent',
                py: 1.2,
                '&:hover': { bgcolor: '#FFCDB2' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: '#3E2723' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  color: '#1a1a1a',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default NavDrawer;