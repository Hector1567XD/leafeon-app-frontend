export interface Payment {
  billId: number;
  paymentId: number;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  cardNumber: string | null;
  createdAt: string | null;
}
