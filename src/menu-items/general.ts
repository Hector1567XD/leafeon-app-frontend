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
          id: 'list-states',
          title: 'Lista de estados',
          type: MenuItemType.Item,
          url: '/states',
          breadcrumbs: false,
        },
        {
          id: 'create-states',
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
      type: MenuItemType.Collapse,
      icon: IconBuildingEstate,
      breadcrumbs: false,
      children: [
        {
          id: 'list-cities',
          title: 'Lista de ciudades',
          type: MenuItemType.Item,
          url: '/cities',
          breadcrumbs: false,
        },
        {
          id: 'create-cities',
          title: 'Crear ciudad',
          type: MenuItemType.Item,
          url: '/cities/create',
          breadcrumbs: false,
        }
      ]
    }
  ]
};

export default other;
