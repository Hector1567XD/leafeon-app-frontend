import dashboard from './dashboard';
import general from './general';
import business from './business';
import personal from './personal';
import { MenuItem } from './types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: MenuItem[] } = {
  items: [dashboard, general, business, personal]
};

export default menuItems;
