// assets
import {
  IconGasStation,
  IconArchive,
  IconShoppingCart,
  IconChecklist,
  IconDiscount,
  IconChartInfographic,
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
    {
      id: "stadistics",
      title: "Estadisticas",
      type: MenuItemType.Collapse,
      icon: IconChartInfographic,
      breadcrumbs: false,
      children: [
        {
          id: "list-eco-products",
          title: "Productos ecologicos",
          type: MenuItemType.Item,
          url: "/eco-products",
          breadcrumbs: false,
        },
        {
          id: "list-fake-clients",
          title: "Clientes falsos",
          type: MenuItemType.Item,
          url: "/fake-clients",
          breadcrumbs: false,
        },
        {
          id: "best-selling-services",
          title: "Atención de modelos por servicio",
          type: MenuItemType.Item,
          url: "/frecuent-models-by-service",
          breadcrumbs: false,
        },
        {
          id: "products-ranking",
          title: "Productos mas vendidos",
          type: MenuItemType.Item,
          url: "/best-selling-products",
          breadcrumbs: false,
        },
        {
          id: "agencies-profitability",
          title: "Rentabilidad de agencias",
          type: MenuItemType.Item,
          url: "/agency-earnings",
          breadcrumbs: false,
        },
        {
          id: "personal-efficiency",
          title: "Eficiencia de personal",
          type: MenuItemType.Item,
          url: "/employees-eficency",
          breadcrumbs: false,
        },
        {
          id: "models-date-attendant",
          title: "Atención de modelos por fecha",
          type: MenuItemType.Item,
          url: "/models-date-attendant",
          breadcrumbs: false,
        },
        {
          id: "frequent-clients",
          title: "Clientes frecuentes",
          type: MenuItemType.Item,
          url: "/fake-clients",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default business;
