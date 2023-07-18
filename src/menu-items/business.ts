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
      type: MenuItemType.Collapse,
      icon: IconDiscount,
      breadcrumbs: false,
      children: [
        {
          id: "list-discounts",
          title: "Lista de descuentos",
          type: MenuItemType.Item,
          url: "/discounts",
          breadcrumbs: false,
        },
        {
          id: "create-discounts",
          title: "Crear descuento",
          type: MenuItemType.Item,
          url: "/discounts/create",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "supply-lines",
      title: "Lineas de suministro",
      url: "/supply-lines",
      type: MenuItemType.Collapse,
      icon: IconChecklist,
      breadcrumbs: false,
      children: [
        {
          id: "list-supply-lines",
          title: "Lista de lineas de suministro",
          type: MenuItemType.Item,
          url: "/supply-lines",
          breadcrumbs: false,
        },
        {
          id: "create-supply-lines",
          title: "Crear lineas de suministro",
          type: MenuItemType.Item,
          url: "/supply-lines/create",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "products",
      title: "Productos",
      url: "/products",
      type: MenuItemType.Collapse,
      icon: IconShoppingCart,
      breadcrumbs: false,
      children: [
        {
          id: "list-products",
          title: "Lista de productos",
          type: MenuItemType.Item,
          url: "/products",
          breadcrumbs: false,
        },
        {
          id: "create-products",
          title: "Crear producto",
          type: MenuItemType.Item,
          url: "/products/create",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default business;
