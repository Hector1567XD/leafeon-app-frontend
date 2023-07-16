import { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
// material-ui
import { Button, FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material';
import styled from 'styled-components';

const ActivitiesForm: FunctionComponent<Props> = ({ className, onSubmit, initialValues, isUpdate }) => {
  const isCreated = !isUpdate;
  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={
          Yup.object().shape({
            serviceId: Yup.number().required('El servicio es requerido'),
            mileage: Yup.number().required('El kilometraje es requerido'),
            useTime: Yup.number().required('El tiempo de uso es requerido'),
          })
        }
        onSubmit={onSubmit as any}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} >
            <FormControl className="field-form" fullWidth>
              <TextField
                id="mileage"
                label="Descripcion de la actividad"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mileage}
                helperText={touched.mileage ? errors.mileage : ''}
                error={touched.mileage && !!errors.mileage}
                name="mileage"
              />
            </FormControl>
            <FormControl className="field-form" fullWidth>
              <TextField
                id="useTime"
                label="Coste por hora de la actividad"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.useTime}
                helperText={touched.useTime ? errors.useTime : ''}
                error={touched.useTime && !!errors.useTime}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                name="useTime"
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
  initialValues: RecommendedServiceFormValues;
  isUpdate?: boolean;
}

export type RecommendedServiceFormValues = {
  serviceId: number;
  mileage: number;
  useTime: number;
  submit: string | null;
};

export type OnSubmit = (
  values: RecommendedServiceFormValues,
  helpers: FormikHelpers<RecommendedServiceFormValues>
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
