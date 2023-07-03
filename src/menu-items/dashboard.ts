// assets
import { IconDashboard } from '@tabler/icons';
import { MenuItem, MenuItemType } from './types';
// constant
const icons = { IconDashboard };

const dashboard: MenuItem = {
  id: 'dashboard',
  title: 'Dashboard',
  type: MenuItemType.Group,
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: MenuItemType.Item,
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
