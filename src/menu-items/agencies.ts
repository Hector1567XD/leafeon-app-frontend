// assets
import { IconBrandChrome, IconHelp, IconCurrentLocation } from '@tabler/icons';
import { MenuItem, MenuItemType } from './types';
// constant
const icons = { IconBrandChrome, IconHelp, IconCurrentLocation };

const other: MenuItem = {
  id: 'agencies-crud-category',
  type: MenuItemType.Group,
  children: [
    {
      id: 'states',
      title: 'State',
      type: MenuItemType.Item,
      url: '/states',
      icon: icons.IconCurrentLocation,
      breadcrumbs: false
    }
  ]
};

export default other;
