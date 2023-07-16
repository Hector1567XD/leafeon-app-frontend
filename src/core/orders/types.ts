export interface Order {
  orderId: number;
  responsibleDni: string | null;
  responsibleName: string | null;
  entryTime: string;
  estimatedDeparture: string;
  realDeparture: string | null;
  bookingId: number;
  employeeDni: string;
  createdAt: string;
}
