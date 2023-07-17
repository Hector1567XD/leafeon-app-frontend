// assets
import { IconUsers, IconCalendarEvent, IconCar } from '@tabler/icons';
import { MenuItem, MenuItemType } from './types';
// constant

const other: MenuItem = {
  id: 'agencies-crud-category-clientele',
  type: MenuItemType.Group,
  title: 'Clientela',
  children: [
    {
      id: 'clients',
      title: 'Clientes',
      type: MenuItemType.Collapse,
      icon: IconUsers,
      breadcrumbs: false,
      children: [
        {
          id: 'list-clients',
          title: 'Lista de clientes',
          type: MenuItemType.Item,
          url: '/clients',
          breadcrumbs: false,
        },
        {
          id: 'create-clients',
          title: 'Crear cliente',
          type: MenuItemType.Item,
          url: '/clients/create',
          breadcrumbs: false,
        }
      ]
    },
    {
      id: 'bookings',
      title: 'Reservas',
      type: MenuItemType.Collapse,
      icon: IconCalendarEvent,
      breadcrumbs: false,
      children: [
        {
          id: 'list-bookings',
          title: 'Lista de reservas',
          type: MenuItemType.Item,
          url: '/bookings',
          breadcrumbs: false,
        },
        {
          id: 'create-bookings',
          title: 'Crear reserva',
          type: MenuItemType.Item,
          url: '/bookings/create',
          breadcrumbs: false,
        }
      ]
    }, 
    {
      id: 'vehicles',
      title: 'Vehículos',
      type: MenuItemType.Collapse,
      icon: IconCar,
      breadcrumbs: false,
      children: [
        {
          id: 'list-vehicles',
          title: 'Lista de vehículos',
          type: MenuItemType.Item,
          url: '/vehicles',
          breadcrumbs: false,
        },
        {
          id: 'create-vehicles',
          title: 'Crear vehículo',
          type: MenuItemType.Item,
          url: '/vehicles/create',
          breadcrumbs: false,
        }
      ]
    }
  ]
};

export default other;
