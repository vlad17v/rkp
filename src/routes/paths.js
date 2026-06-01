import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';

export const PATHS = {
  HOME:      '/',
  SETTINGS:  '/settings',
  USERS:     '/users',
  NOT_FOUND: '*',
};

export const MENU_ITEMS = [
  { text: 'Home',     path: PATHS.HOME,     icon: HomeIcon,     end: true  },
  { text: 'Settings', path: PATHS.SETTINGS, icon: SettingsIcon, end: false },
  { text: 'Users',    path: PATHS.USERS,    icon: PeopleIcon,   end: false },
];