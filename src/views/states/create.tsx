import { FunctionComponent, useCallback } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Button, FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import BackendError from 'exceptions/backend-error';
import createState from 'services/states/create-state';
import { useNavigate } from 'react-router';
import { setSuccessMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../store/index';

const CreateState: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
    try {
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await createState(values);
      navigate('/states');
      dispatch(setSuccessMessage(`Estado ${values.name} creado correctamente`));
    } catch (error) {
      if (error instanceof BackendError) {
        setErrors({
          ...error.getFieldErrorsMessages(),
          submit: error.getMessage()
        });
      }
      setStatus({ success: false });
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, navigate]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Estados
        </Typography>
      </MainCard>

      <Formik
        initialValues={{
          name: '',
          submit: null
        }}
        validationSchema={
          Yup.object().shape({
            name: Yup.string().max(30).required('El nombre es requerido'),
          })
        }
        onSubmit={onSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} >
            <MainCard className={'form-data'} title="Crear estado">
              <FormControl fullWidth>
                <TextField
                  id="name"
                  label="Nombre de estado"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  helperText={errors.name}
                  error={!!errors.name}
                  name="name"
                />
              </FormControl>
            </MainCard>
            <MainCard className={'form-data flex-column'}>
              {errors.submit && (
                  <FormHelperText error>{errors.submit}</FormHelperText>
              )}
              <Button variant="outlined" type="submit" color="primary">
                Crear estado
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
}

export default styled(CreateState)`
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
`;
