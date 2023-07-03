import dashboard from './dashboard';
import pages from './pages';
import other from './other';
import { MenuItem } from './types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: MenuItem[] } = {
  items: [dashboard, pages, other]
};

export default menuItems;
