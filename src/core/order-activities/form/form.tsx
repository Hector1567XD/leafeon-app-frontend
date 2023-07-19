import { FunctionComponent, useState } from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
// material-ui
import { Button, FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material';
import styled from 'styled-components';
//import useServicesOptions from 'core/services/use-services-options';
import SelectField from 'components/SelectField';
import useEmployeesOptions from 'core/employees/use-employees-options';
import useServicesOptions from 'core/services/use-services-options';
import useActivitiesOptionsForServiceId from 'core/activities/use-activities-options-for-service-id';

const USE_AUTOCOMPLETES = false;

const ActivitiesForm: FunctionComponent<Props> = ({
  className, onSubmit, initialValues, isUpdate, isParentUpdate, agencyRif
}) => {
  const isCreated = !isUpdate;
  const servicesOptions = useServicesOptions({
    onlyForAgencyRif: agencyRif,
  });
  const [serviceId, setServiceId] = useState<number | null>(initialValues.serviceId);
  const [activityId, setActivityId] = useState<number | null>(initialValues.activityId);
  const activitiesOptions = useActivitiesOptionsForServiceId(serviceId)
  const employeesOptions = useEmployeesOptions({
    onlyForAgencyRif: agencyRif,
  })

  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={
          Yup.object().shape({
            activityId: Yup.number().required('La actividad es requerida'),
            serviceId: Yup.number().required('El servicio es requerido'),
            employeeDni: Yup.string().required('El empleado es requerido'),
            hoursTaken: Yup.number().nullable(),
          })
        }
        onSubmit={onSubmit as any}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} >
            <FormControl
              className="field-form"
              fullWidth
              disabled={isParentUpdate && isUpdate}
            >
              <SelectField
                className="field-form"
                fullWidth={true}
                name="serviceId"
                disabled={isParentUpdate && isUpdate}
                onChange={(e) => {
                  handleChange(e)
                  setServiceId(e.target.value as number);
                }}
                onBlur={handleBlur}
                label="Servicios"
                options={servicesOptions}
                helperText={touched.serviceId ? errors.serviceId : ''}
                error={touched.serviceId && !!errors.serviceId}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.serviceId}
              />
            </FormControl>
            {
              serviceId && (
                <FormControl
                  className="field-form"
                  fullWidth
                  disabled={isParentUpdate && isUpdate}
                >
                  <SelectField
                    className="field-form"
                    fullWidth={true}
                    name="activityId"
                    disabled={isParentUpdate && isUpdate}
                    onChange={(e) => {
                      handleChange(e)
                      setActivityId(e.target.value as number);
                    }}
                    onBlur={handleBlur}
                    label="Actividades"
                    options={activitiesOptions}
                    helperText={touched.activityId ? errors.activityId : ''}
                    error={touched.activityId && !!errors.activityId}
                    isAutocomplete={USE_AUTOCOMPLETES}
                    value={values.activityId}
                  />
                </FormControl>
              )
            }
            {
              activityId && (
                <FormControl
                  className="field-form"
                  fullWidth
                >
                  <SelectField
                    className="field-form"
                    fullWidth={true}
                    name="employeeDni"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Empleado"
                    options={employeesOptions}
                    helperText={touched.employeeDni ? errors.employeeDni : ''}
                    error={touched.employeeDni && !!errors.employeeDni}
                    isAutocomplete={USE_AUTOCOMPLETES}
                    value={values.employeeDni}
                  />
                </FormControl>
              )
            }
            <FormControl className="field-form" fullWidth>
              <TextField
                id="hoursTaken"
                label="Horas tomadas"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hoursTaken}
                helperText={touched.hoursTaken ? errors.hoursTaken : ''}
                error={touched.hoursTaken && !!errors.hoursTaken}
                InputProps={{
                  endAdornment: <InputAdornment position="start">horas</InputAdornment>
                }}
                name="hoursTaken"
              />
            </FormControl>
            {errors.submit && (
                <FormHelperText error>{errors.submit}</FormHelperText>
            )}
            <Button variant="outlined" type="submit" color="primary">
              { isCreated ? 'Agregar' : 'Editar' }
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

interface Props {
  className?: string;
  onSubmit: OnSubmit;
  initialValues: OrderActivityFormValues;
  isUpdate?: boolean;
  isParentUpdate?: boolean;
  agencyRif: string;
}

export type OrderActivityFormValues = {
  serviceId: number | null;
  activityId: number | null;
  employeeDni: string | null;
  hoursTaken: number;
  isParentUpdate?: boolean;
  submit: string | null;
};

export type OnSubmit = (
  values: OrderActivityFormValues,
  helpers: FormikHelpers<OrderActivityFormValues>
) => void | Promise<any>;

export default styled(ActivitiesForm)`
  display: flex;
  flex-direction: column;

  .container-form-services {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* dos columnas de ancho igual */
    grid-column-gap: 20px; /* espacio entre las columnas */
  }


  @media screen and (max-width: 768px) { /* media query para dispositivos móviles */
    .container-form-services {
      grid-template-columns: 1fr; /* una sola columna */
      grid-column-gap: 0; /* sin espacio entre columnas */
      padding: 0; /* sin padding */
    }
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .field-form {
    margin: 12px 0px;
  }

  .form-data {
    margin-top: 16px;
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;
