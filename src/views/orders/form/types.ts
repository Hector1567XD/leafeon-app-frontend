import { FormikHelpers } from "formik";

export type ActivityOrder = {
  serviceId: number;
  activityId: number;
  employeeDni: string;
}

export type FormValues = {
  entryTime: string;
  estimatedDeparture: string;
  bookingId: number;
  employeeDni: string;
  responsibleDni: string | null;
  responsibleName: string | null;
  activities: ActivityOrder[];
  submit: string | null;    
};

export interface Props {
  isUpdate?: boolean;
  className?: string;
  onSubmit: OnSubmit;
  title: string;
  initialValues: FormValues;
}

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;
