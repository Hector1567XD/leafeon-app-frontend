// assets
import { IconCurrentLocation, IconBuildingEstate, IconBuildingStore } from '@tabler/icons';
import { MenuItem, MenuItemType } from './types';
// constant

const other: MenuItem = {
  id: 'agencies-crud-category',
  type: MenuItemType.Group,
  title: 'Personal',
  children: [
    {
      id: 'jobs',
      title: 'Cargos',
      type: MenuItemType.Collapse,
      icon: IconCurrentLocation,
      breadcrumbs: false,
      children: [
        {
          id: 'list-jobs',
          title: 'Lista de cargos',
          type: MenuItemType.Item,
          url: '/jobs',
          breadcrumbs: false,
        },
        {
          id: 'create-jobs',
          title: 'Crear cargo',
          type: MenuItemType.Item,
          url: '/jobs/create',
          breadcrumbs: false,
        }
      ]
    }
  ]
};

export default other;
