import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router';
import { MENU_ITEMS } from '../routes/paths';

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
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <NavLink
                to={item.path}
                end={item.end}
                onClick={onClose}
                style={{ textDecoration: 'none', width: '100%' }}
              >
                {({ isActive }) => (
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2,
                    py: 1.2,
                    borderRadius: '12px',
                    bgcolor: isActive ? '#FFCDB2' : 'transparent',
                    '&:hover': { bgcolor: '#FFCDB2' },
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                  }}>
                    <ListItemIcon sx={{ minWidth: 0, color: '#3E2723' }}>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        color: '#1a1a1a',
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '0.95rem',
                      }}
                    />
                  </Box>
                )}
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default NavDrawer;