import { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import ActivitiesCrudWrapper from './activities/activities-crud-wrapper';
import { Props } from './types';
import getErrorOnArrayOrText from 'helpers/get-error-on-array-or-text';

const Form: FunctionComponent<Props> = ({
  className, title, onSubmit, initialValues, isUpdate, initialActivities, serviceId
}) => {
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
            activities: Yup.array().min(1, 'Es requerida al menos una actividad')
              .required('Son requeridas las actividades')
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
              <div className={'form-data activites-crud'}>
                <ActivitiesCrudWrapper
                  //NOT use inputActivities={values.activities} (for moment)
                  serviceId={serviceId || null}
                  inputActivities={initialActivities}
                  fieldName={'activities'}
                  onHandleFormChange={handleChange}
                  helperText={touched.activities ? (getErrorOnArrayOrText(errors.activities)) : ''}
                  error={touched.activities && !!errors.activities}
                />
              </div>
            </div>
            <MainCard className={'form-data flex-column'}>
              {errors.submit && (<FormHelperText error>{errors.submit}</FormHelperText>)}
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

export default Form;
