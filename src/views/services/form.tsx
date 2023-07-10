import { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import styled from 'styled-components';
import ActivitiesCrud from './activities/activities-crud';

const Form: FunctionComponent<Props> = ({ className, title, onSubmit, initialValues, isUpdate }) => {
  //const isCreated = !isUpdate;
  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={
          Yup.object().shape({
            description: Yup.string().max(30).required('El nombre es requerido'),
          })
        }
        onSubmit={onSubmit as any}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} >
            <div className="container-form-services">
              <MainCard className={'form-data'} contentClass={'form-content'} title={title}>
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="description"
                    label="Descripcion de servicio"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    helperText={touched.description ? errors.description : ''}
                    error={touched.description && !!errors.description}
                    name="description"
                  />
                </FormControl>
              </MainCard>
              <div className={'form-data'}>
                <ActivitiesCrud
                  items={
                    [
                      {
                        "activityId": 1,
                        "description": "Descripción de Actividad",
                        "costHour": 25.7,
                      },
                      {
                        "activityId": null,
                        "description": "Descripción de Actividad B",
                        "costHour": 25,
                      }
                    ] as any
                  }
                />
              </div>
            </div>
            <MainCard className={'form-data flex-column'}>
              {errors.submit && (
                  <FormHelperText error>{errors.submit}</FormHelperText>
              )}
              <Button variant="outlined" type="submit" color="primary">
                Guardar
              </Button>
            </MainCard>
          </form>
        )}
      </Formik>
    </div>
  );
};

interface Props {
  className?: string;
  onSubmit: OnSubmit;
  title: string;
  initialValues: FormValues;
  isUpdate?: boolean;
}

type FormValues = {
  description: string;
  submit: string | null;
};

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;

export default styled(Form)`
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
