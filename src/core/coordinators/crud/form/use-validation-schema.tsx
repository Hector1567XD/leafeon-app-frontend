import { useMemo } from 'react';
import * as Yup from 'yup';
import ObjectSchema, { ObjectShape } from 'yup/lib/object';

export default function useValidationSchema(): ObjectSchema<ObjectShape> {
  return useMemo(() => {
    return Yup.object().shape({
        agencyRif: Yup.string()
          .required('Es necesario indicar el RIF de la agencia'),
        employeeDni: Yup.string()
          .required('Es necesario indicar una cédula')
          .max(16, 'la cédula debe ser menor a 16 carácteres')
          .matches(/^\d+$/, 'La cédula debe contener solo números'),
        serviceId: Yup.number()
          .min(1, 'El id de servicio debe ser mayor o igual a 1'),
        reservationTime: Yup.number()
          .min(1, 'El tiempo de reserva debe ser mayor o igual a 1')
          .max(7, 'El tiempo de reserva debe ser menor o igual a 7'),
        capacity: Yup.number()
          .min(1, 'La capacidad debe ser mayor o igual a 1')
    });
  }, []);
}
