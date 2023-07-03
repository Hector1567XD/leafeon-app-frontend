// assets
import { IconKey } from '@tabler/icons';
import { MenuItem, MenuItemType } from './types';
// constant
const icons = {
  IconKey
};

const pages: MenuItem = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: MenuItemType.Group,
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: MenuItemType.Collapse,
      icon: icons.IconKey,

      children: [
        {
          id: 'login3',
          title: 'Login',
          type: MenuItemType.Item,
          url: '/pages/login',
          target: true
        }
      ]
    }
  ]
};

export default pages;
