// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';
import { MenuItem, MenuItemType } from './types';
// constant
const icons = { IconBrandChrome, IconHelp };

const other: MenuItem = {
  id: 'sample-docs-roadmap',
  type: MenuItemType.Group,
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: MenuItemType.Item,
      url: '/sample-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: MenuItemType.Item,
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
