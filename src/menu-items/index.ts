import dashboard from './dashboard';
import pages from './pages';
import general from './general';
import { MenuItem } from './types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: MenuItem[] } = {
  items: [dashboard, pages, general]
};

export default menuItems;
