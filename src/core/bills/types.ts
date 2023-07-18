export interface Bill {
  billId: number;
  billDate: string;
  discountValue: number;
  totalCost: number;
  orderId: number;
  createdAt: string;
}

export interface BillAlled extends Bill {
  name: string;
  clientDni: string;
}
