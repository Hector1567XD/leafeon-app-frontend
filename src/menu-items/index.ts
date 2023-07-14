import dashboard from './dashboard';
import general from './general';
import business from './business';
import { MenuItem } from './types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: MenuItem[] } = {
  items: [dashboard, general, business]
};

export default menuItems;
