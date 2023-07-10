import dashboard from './dashboard';
import general from './general';
import company from './company';
import { MenuItem } from './types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: MenuItem[] } = {
  items: [dashboard, general, company]
};

export default menuItems;
