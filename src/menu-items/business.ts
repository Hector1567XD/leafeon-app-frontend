// assets
import {
  IconGasStation,
  IconArchive,
  IconShoppingCart,
  IconChecklist,
  IconDiscount,
} from "@tabler/icons";
import { MenuItem, MenuItemType } from "./types";
// constant

const business: MenuItem = {
  id: "business-crud-category",
  type: MenuItemType.Group,
  title: "Negocio",
  children: [
    {
      id: "services",
      title: "Servicios",
      type: MenuItemType.Collapse,
      icon: IconGasStation,
      breadcrumbs: false,
      children: [
        {
          id: "list-services",
          title: "Lista de servicios",
          type: MenuItemType.Item,
          url: "/services",
          breadcrumbs: false,
        },
        {
          id: "create-services",
          title: "Crear servicio",
          type: MenuItemType.Item,
          url: "/services/create",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "inventory",
      title: "Inventario",
      url: "/inventory",
      type: MenuItemType.Item,
      icon: IconArchive,
      breadcrumbs: false,
    },
    {
      id: "discounts",
      title: "Descuentos",
      url: "/discounts",
      type: MenuItemType.Item,
      icon: IconDiscount,
      breadcrumbs: false,
    },
    {
      id: "supply-lines",
      title: "Lineas de suministro",
      url: "/supply-lines",
      type: MenuItemType.Item,
      icon: IconChecklist,
      breadcrumbs: false,
    },
    {
      id: "products",
      title: "Productos",
      url: "/products",
      type: MenuItemType.Item,
      icon: IconShoppingCart,
      breadcrumbs: false,
    },
  ],
};

export default business;
