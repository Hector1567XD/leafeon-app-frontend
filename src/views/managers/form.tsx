import { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import styled from 'styled-components';

const USE_AUTOCOMPLETES = false;

const Form: FunctionComponent<Props> = ({ className, title, onSubmit, initialValues }) => {

  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={
          Yup.object().shape({
            managerDni: Yup.string().max(30).required('La cédula del encargado es requerida'),
            name: Yup.string().max(30).required('El nombre del encargado es requerido'),
            mainPhone: Yup.string().max(30).required('El teléfono principal del encargado es requerido'),
            secondaryPhone: Yup.string().max(30).required('El teléfono secundario del encargado es requerido'),
            address: Yup.string().max(30).required('La dirección del encargado es requerida'),
            email: Yup.string().max(30).required('El correo electrónico del encargado es requerido'),
          })
        }
        onSubmit={onSubmit as any}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} >
            <MainCard className={'form-data'} title={title}>
              <FormControl className="field-form"  fullWidth>
                <TextField
                  id="managerDni"
                  label="Cédula"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.managerDni}
                  helperText={touched.managerDni ? errors.managerDni : ''}
                  error={touched.managerDni && !!errors.managerDni}
                  name="managerDni"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="name"
                  label="Nombre"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  helperText={touched.name ? errors.name : ''}
                  error={touched.name && !!errors.name}
                  name="name"
                />
              </FormControl>
              <FormControl className="field-form"  fullWidth>
                <TextField
                  id="mainPhone"
                  label="Teléfono principal"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mainPhone}
                  helperText={touched.mainPhone ? errors.mainPhone : ''}
                  error={touched.mainPhone && !!errors.mainPhone}
                  name="mainPhone"
                />
              </FormControl>
              <FormControl className="field-form"  fullWidth>
                <TextField
                  id="secondaryPhone"
                  label="Teléfono secundario"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.secondaryPhone}
                  helperText={touched.secondaryPhone ? errors.secondaryPhone : ''}
                  error={touched.secondaryPhone && !!errors.secondaryPhone}
                  name="secondaryPhone"
                />
              </FormControl>
              <FormControl className="field-form"  fullWidth>
                <TextField
                  id="address"
                  label="Dirección"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  helperText={touched.address ? errors.address : ''}
                  error={touched.address && !!errors.address}
                  name="address"
                />
              </FormControl>
              <FormControl className="field-form"  fullWidth>
                <TextField
                  id="email"
                  label="Correo electrónico"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email ? errors.email : ''}
                  error={touched.email && !!errors.email}
                  name="email"
                />
              </FormControl>
            </MainCard>
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
}

export type FormValues = {
  managerDni: string;
  name: string;
  mainPhone: string;
  secondaryPhone?: string;
  address: string;
  email: string;
  submit: string | null;
};

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;


export default styled(Form)`
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
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

  .field-form {
    margin: 12px 0px;
  }
`;
