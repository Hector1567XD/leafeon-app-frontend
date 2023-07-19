import { OrderActivity } from "core/order-activities/types";
import { FormikHelpers } from "formik";


export type FormValues = {
  entryTime: string;
  estimatedDeparture: string;
  bookingId: number;
  employeeDni: string;
  responsibleDni: string | null;
  realDeparture: string | null;
  responsibleName: string | null;
  activities: OrderActivity[];
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
