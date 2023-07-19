export interface Activity {
  serviceId: number
  activityId: number
  description: string
  costHour: number
  createdAt: string
}

export interface InputActivity extends Omit<Activity, 'createdAt' | 'activityId' | 'serviceId'> {
  activityId: number | null;
  serviceId: number | null
}

