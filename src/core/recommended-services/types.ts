import { Service } from 'core/services/types';
import { ChangeEvent } from 'react';

export interface RecommendedService {
  serviceId: number;
  modelId: string;
  createdAt: string;
  mileage: number;
  useTime: number;
  service: Omit<Service, 'bookings' | 'activities'>;
}

export interface InputRecommendedService
  extends Omit<RecommendedService, 'service' | 'createdAt' | 'modelId'>
{
  modelId: string;
  mileage: number;
  useTime: number;
};
