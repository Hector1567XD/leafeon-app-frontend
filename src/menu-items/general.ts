// assets
import { IconCurrentLocation, IconBuildingEstate } from '@tabler/icons';
import { MenuItem, MenuItemType } from './types';
// constant

const other: MenuItem = {
  id: 'agencies-crud-category',
  type: MenuItemType.Group,
  title: 'General',
  children: [
    {
      id: 'states',
      title: 'Estado',
      type: MenuItemType.Item,
      url: '/states',
      icon: IconCurrentLocation,
      breadcrumbs: false
    },
    {
      id: 'cities',
      title: 'Ciudad',
      type: MenuItemType.Item,
      url: '/cities',
      icon: IconBuildingEstate,
      breadcrumbs: false
    }
  ]
};

export default other;
