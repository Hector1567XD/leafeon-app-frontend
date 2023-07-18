// assets
import { IconBriefcase, IconMan, IconUser } from '@tabler/icons';
import { MenuItem, MenuItemType } from './types';
// constant

const other: MenuItem = {
  id: 'agencies-crud-category-personal',
  type: MenuItemType.Group,
  title: 'Personal',
  children: [
    {
      id: 'jobs',
      title: 'Cargos',
      type: MenuItemType.Collapse,
      icon: IconBriefcase,
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
    },
    {
      id: 'managers',
      title: 'Encargados',
      type: MenuItemType.Collapse,
      icon: IconMan,
      breadcrumbs: false,
      children: [
        {
          id: 'list-managers',
          title: 'Lista de encargados',
          type: MenuItemType.Item,
          url: '/managers',
          breadcrumbs: false,
        },
        {
          id: 'create-managers',
          title: 'Crear encargado',
          type: MenuItemType.Item,
          url: '/managers/create',
          breadcrumbs: false,
        }
      ]
    },
    {
    
      id: 'coordinators',
      url: 'coordinators',
      title: 'Coordinadores',
      type: MenuItemType.Item,
      icon: IconUser,
      breadcrumbs: false
    }
  ]
};

export default other;
