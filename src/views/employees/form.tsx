import { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Button, FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material';
import styled from 'styled-components';
import SelectField from 'components/SelectField';
import useAgencyOptions from 'core/agencies/use-agency-options';
import useJobOptions from 'core/jobs/use-jobs-options';
import useServicesOptions from 'core/services/use-services-options';

const USE_AUTOCOMPLETES = false;

const Form: FunctionComponent<Props> = ({ className, title, onSubmit, initialValues, isUpdate }) => {
  const isCreated = !isUpdate;
  const agencyOptions = useAgencyOptions();
  const jobOptions = useJobOptions();
  const serviceOptions = useServicesOptions();

  const extraValidations: any = isCreated ? {
    employeeDni: Yup.string().max(8).required('La cedula del empleado es requerida'),
  } : {};

  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={
          Yup.object().shape({
            ...extraValidations,
            name: Yup.string().max(30).required('El nombre del empleado es requerido'),
            email: Yup.string().max(30).required('El correo electrónico del empleado es requerido'),
            mainPhone: Yup.string().max(11).required('El teléfono principal del empleado es requerido'),
            secondaryPhone: Yup.string().max(11).required('El teléfono secundario del empleado es requerido'),
          })
        }
        onSubmit={onSubmit as any}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} >
            <MainCard className={'form-data'} title={title}>
              {
                isCreated &&
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="employeeDni"
                    label="Cedula"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.employeeDni}
                    helperText={touched.employeeDni ? errors.employeeDni : ''}
                    error={touched.employeeDni && !!errors.employeeDni}
                    name="employeeDni"
                  />
                </FormControl>
              }
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="name"
                  label="Nombre del empleado"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  helperText={touched.name ? errors.name : ''}
                  error={touched.name && !!errors.name}
                  name="name"
                />
              </FormControl>
             <FormControl className="field-form" fullWidth>
                <TextField
                  id="phone"
                  label="Teléfono"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  helperText={touched.phone ? errors.phone : ''}
                  error={touched.phone && !!errors.phone}
                  name="phone"
                />
              </FormControl>
             <FormControl className="field-form" fullWidth>
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
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="salary"
                  label="Salario"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.salary}
                  helperText={touched.salary ? errors.salary : ''}
                  error={touched.salary && !!errors.salary}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                  name="salary"
                />
              </FormControl>
              <SelectField
                fullWidth={true}
                className="field-form"
                name="agencyRif"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Agencia"
                options={agencyOptions}
                helperText={touched.agencyRif ? errors.agencyRif : ''}
                error={touched.agencyRif && !!errors.agencyRif}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.agencyRif}
              />
              <SelectField
                fullWidth={true}
                className="field-form"
                name="jobId"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Cargo"
                options={jobOptions}
                helperText={touched.jobId ? errors.jobId : ''}
                error={touched.jobId && !!errors.jobId}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.jobId}
              />
              <SelectField
                fullWidth={true}
                className="field-form"
                name="speciality"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Especialidad"
                options={serviceOptions}
                helperText={touched.speciality ? errors.speciality : ''}
                error={touched.speciality && !!errors.speciality}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.speciality}
              />
              
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
  isUpdate?: boolean;
  className?: string;
  onSubmit: OnSubmit;
  title: string;
  initialValues: FormValues;
}

export type FormValues = {
  employeeDni: string;
  name: string;
  phone: string;
  address: string;
  salary: string;
  agencyRif: string;
  jobId: number;
  speciality: string;
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
