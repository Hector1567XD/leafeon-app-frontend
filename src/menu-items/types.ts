import { ChipProps } from "@mui/material/Chip";

export interface MenuItem {
  id: string;
  title?: string;
  type: MenuItemType;
  url?: string;
  icon?: any;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: MenuItem[];
  caption?: string;
  chip?: ChipItemProps;
  disabled?: boolean;
}

export enum MenuItemType {
  Collapse = 'collapse',
  Item = 'item',
  Group = 'group'
}

export interface ChipItemProps {
  color: ChipProps['color'];
  variant: ChipProps['variant'];
  size: ChipProps['size'];
  label: ChipProps['label'];
  avatar?: ChipProps['avatar'];
}
