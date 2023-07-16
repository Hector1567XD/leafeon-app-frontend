export interface InputCoordinator
{
  employeeDni: string;
  serviceId: number;
  reservationTime: number;
  capacity: number;
};

export interface Coordinator extends InputCoordinator {
  agencyRif: string;
  agencyName: string;
  employeeName: string;
  serviceName: string;
  createdAt: string;
}
