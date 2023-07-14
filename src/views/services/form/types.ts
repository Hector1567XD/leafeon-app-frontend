import { Activity, InputActivity } from "core/activities/types";
import { FormikHelpers } from "formik";
import { ChangeEvent } from "react";

export interface Props {
  className?: string;
  onSubmit: OnSubmit;
  title: string;
  initialValues: FormValues;
  initialActivities: Activity[];
  serviceId: number | null;
  isUpdate?: boolean;
}

export type FormValues = {
  description: string;
  activities: InputActivity[];
  submit: string | null;
};

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;

export interface ActivityLocal extends Omit<Activity, 'activityId'> {
  activityId: number | null;
  localDeleted?: boolean;
  onlineState?: Activity | null;
}

export type ChangeEventActivities = ChangeEvent<{ value: InputActivity[] }>;
