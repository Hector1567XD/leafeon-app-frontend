import { Activity } from 'core/activities/types';
import { Booking } from 'core/bookings/types';

export interface Service {
  serviceId: number
  description: string
  totalCost: number
  createdAt: string
  activities: Activity[]
  bookings: Booking[]
}

export interface PaginatedService extends Omit<Service, 'bookings' | 'activities'> {}

export interface ShortService extends Omit<Service, 'bookings' | 'activities' | 'totalCost' | 'createdAt'> {}