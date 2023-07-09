import dashboard from './dashboard';
import general from './general';
import { MenuItem } from './types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: MenuItem[] } = {
  items: [dashboard, general]
};

export default menuItems;
