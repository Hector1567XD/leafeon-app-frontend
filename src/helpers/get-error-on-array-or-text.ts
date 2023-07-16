import { FormikErrors } from "formik";

export default function getErrorOnArrayOrText<T>(
  errors: string | string[] | FormikErrors<T>[] | undefined
): string {
  if (errors === undefined) {
    return '';
  }

  if (typeof errors === 'string') {
    return errors;
  }

  if (errors instanceof Array && errors.length >= 1) {
    if (typeof errors[0] === 'string')
      return errors[0];
    
    return '';
  }

  return '';
}
