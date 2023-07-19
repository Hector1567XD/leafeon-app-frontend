import { Service } from 'core/services/types';

export type OrderActivity = {
  orderId: number;
  serviceId: number;
  activityId: number;
  employeeName: string;
  activityDescription: string;
  employeeDni: string;
  costHour: number;
  hoursTaken: number;
  createdAt: string;
}

export interface InputOrderActivity
{
  orderId: number;
  serviceId: number;
  activityId: number;
  employeeDni: string;
  hoursTaken: number;
};

export interface LocalOrderActivity extends Omit<OrderActivity, 'orderId'>
{};
