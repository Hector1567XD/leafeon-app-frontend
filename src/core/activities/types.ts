export interface Activity {
  activityId: number
  description: string
  costHour: number
  createdAt: string
}

export interface InputActivity extends Omit<Activity, 'createdAt' | 'activityId'> {
  activityId: number | null;
  serviceId: number | null
}
