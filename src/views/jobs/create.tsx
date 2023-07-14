import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import BackendError from 'exceptions/backend-error';
import createJob from 'services/jobs/create-job';
import { useNavigate } from 'react-router';
import { setErrorMessage, setIsLoading, setSuccessMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../store/index';
import Form, { FormValues } from './form';
import { FormikHelpers } from 'formik';

const CreateJob: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await createJob(values);
      navigate('/jobs');
      dispatch(setSuccessMessage(`Cargo ${values.description} creado correctamente`));
    } catch (error) {
      if (error instanceof BackendError) {
        setErrors({
          ...error.getFieldErrorsMessages(),
          submit: error.getMessage()
        });
        dispatch(setErrorMessage(error.getMessage()));
      }
      setStatus({ success: 'false'});
    } finally {
      dispatch(setIsLoading(false));
      setSubmitting(false);
    }
  }, [dispatch, navigate]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Cargos
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          description: '',
          submit: null
        }}
        title={'Crear cargo'}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateJob)`
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
