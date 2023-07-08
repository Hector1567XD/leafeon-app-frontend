import dashboard from './dashboard';
import pages from './pages';
import agencies from './agencies';
import { MenuItem } from './types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: MenuItem[] } = {
  items: [dashboard, pages, agencies]
};

export default menuItems;
