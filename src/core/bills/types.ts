import { InvoiceItem } from "components/InvoiceTable";

export interface Bill {
  billId: number;
  billDate: string;
  discountValue: number;
  totalCost: number | null;
  totalCostFinal: number | null;
  orderId: number;
  createdAt: string;
  items: InvoiceItem[];
}

export interface BillAlled extends Bill {
  name: string;
  clientDni: string;
}
