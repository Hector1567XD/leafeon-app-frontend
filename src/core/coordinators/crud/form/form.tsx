import { FunctionComponent, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
// material-ui
import { Button, FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material';
import styled from 'styled-components';
import useServicesOptions from 'core/services/use-services-options';
import SelectField from 'components/SelectField';
import useValidationSchema from './use-validation-schema';
import useEmployeesOptions from 'core/employees/use-employees-options';
import useAgenciesOptions from 'core/agencies/use-agencies-options';

const USE_AUTOCOMPLETES = false;

const CoordinatorsForm: FunctionComponent<Props> = ({
  className, onSubmit, initialValues, isUpdate, fixedAgencyRif
}) => {
  const [agencyRif, setAgencyRif] = useState<string | null>(fixedAgencyRif);
  const isCreated = !isUpdate;
  const validationSchema = useValidationSchema();
  const agenciesOptions = useAgenciesOptions();
  const servicesOptions = useServicesOptions();
  const employeesOptions = useEmployeesOptions({
    onlyForAgencyRif: fixedAgencyRif || agencyRif
  });

  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit as any}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} >
            <FormControl
              className="field-form"
              fullWidth
              disabled={isUpdate || !!fixedAgencyRif}
            >
              <SelectField
                className="field-form"
                fullWidth={true}
                name="agencyRif"
                disabled={isUpdate || !!fixedAgencyRif}
                onChange={(e) => {
                  handleChange(e);
                  setAgencyRif(''+e.target.value!);
                }}
                onBlur={handleBlur}
                label="Agencias"
                options={agenciesOptions}
                helperText={touched.agencyRif ? errors.agencyRif : ''}
                error={touched.agencyRif && !!errors.agencyRif}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.agencyRif}
              />
            </FormControl>
            {
              values.agencyRif && 
              <FormControl
                className="field-form"
                fullWidth
                disabled={isUpdate}
              >
                <SelectField
                  className="field-form"
                  fullWidth={true}
                  name="employeeDni"
                  disabled={isUpdate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Coordinador"
                  options={employeesOptions}
                  helperText={touched.employeeDni ? errors.employeeDni : ''}
                  error={touched.employeeDni && !!errors.employeeDni}
                  isAutocomplete={USE_AUTOCOMPLETES}
                  value={values.employeeDni}
                />
              </FormControl>
            }
            <FormControl
              className="field-form"
              fullWidth
              disabled={isUpdate}
            >
              <SelectField
                className="field-form"
                fullWidth={true}
                name="serviceId"
                disabled={isUpdate}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Servicios"
                options={servicesOptions}
                helperText={touched.serviceId ? errors.serviceId : ''}
                error={touched.serviceId && !!errors.serviceId}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.serviceId}
              />
            </FormControl>
            <FormControl
              className="field-form"
              fullWidth
            >
              <TextField
                id="capacity"
                label="Capacidad"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.capacity}
                helperText={touched.capacity ? errors.capacity : ''}
                error={touched.capacity && !!errors.capacity}
                InputProps={{
                  endAdornment: <InputAdornment position="start">Ordenes</InputAdornment>
                }}
                name="capacity"
              />
            </FormControl>
            <FormControl className="field-form" fullWidth>
              <TextField
                id="reservationTime"
                label="Tiempo de reserva"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reservationTime}
                helperText={touched.reservationTime ? errors.reservationTime : ''}
                error={touched.reservationTime && !!errors.reservationTime}
                InputProps={{
                  endAdornment: <InputAdornment position="start">Dias</InputAdornment>
                }}
                name="reservationTime"
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
  initialValues: CoordinatorsFormValues;
  isUpdate?: boolean;
  fixedAgencyRif: string | null;
}

export type CoordinatorsFormValues = {
  agencyRif: string | null;
  employeeDni: string | null;
  serviceId: number | null;
  capacity: number;
  reservationTime: number;
  submit: string | null;
};

export type OnSubmit = (
  values: CoordinatorsFormValues,
  helpers: FormikHelpers<CoordinatorsFormValues>
) => void | Promise<any>;

export default styled(CoordinatorsForm)`
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
