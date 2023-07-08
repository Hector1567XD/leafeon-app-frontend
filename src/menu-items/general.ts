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
      type: MenuItemType.Collapse,
      icon: IconCurrentLocation,
      breadcrumbs: false,
      children: [
        {
          id: 'states',
          title: 'Lista de estados',
          type: MenuItemType.Item,
          url: '/states',
          breadcrumbs: false,
        },
        {
          id: 'states',
          title: 'Crear estado',
          type: MenuItemType.Item,
          url: '/states/create',
          breadcrumbs: false,
        }
      ]
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
