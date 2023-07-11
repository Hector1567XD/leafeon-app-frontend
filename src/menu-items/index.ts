import dashboard from './dashboard';
import general from './general';
import personal from './personal';
import { MenuItem } from './types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: MenuItem[] } = {
  items: [dashboard, general, personal]
};

export default menuItems;
