import { InputRecommendedService, RecommendedService } from "core/recommended-services/types";
import { FormikHelpers } from "formik";

export interface Props {
  className?: string;
  onSubmit: OnSubmit;
  title: string;
  initialValues: FormValues;
  inputServices: RecommendedService[];
  isUpdate?: boolean;
}

export type FormValues = {
  modelId: string;
  brand: string;
  description: string;
  modelKg: number;
  modelYear: string;
  seatsQuantity: number;
  refrigerantType: string;
  engineOilType: string;
  oilBox: string;
  octane: number;
  services: InputRecommendedService[];
  submit: string | null;
};

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;
