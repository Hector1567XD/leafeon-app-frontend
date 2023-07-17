import { useMemo } from 'react';
import * as Yup from 'yup';
import ObjectSchema, { ObjectShape } from 'yup/lib/object';

export default function useValidationSchema(): ObjectSchema<ObjectShape> {
  return useMemo(() => {
    return Yup.object().shape({
      productId: Yup.string()
        .required('Es necesario indicar un producto'),
      agencyRif: Yup.string()
        .required('Es necesario indicar un rif de agencia'),
      onStock: Yup.number(),
      maxCapacity: Yup.number(),
      minCapacity: Yup.number()
    });
  }, []);
}
