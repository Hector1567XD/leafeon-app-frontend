import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import BackendError from 'exceptions/backend-error';
import createManager from 'services/managers/create-manager';
import { useNavigate } from 'react-router';
import { setSuccessMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../store/index';
import Form from './form';

const CreateJob: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
    try {
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await createManager(values);
      navigate('/managers');
      dispatch(setSuccessMessage(`Encargado ${values.description} creado correctamente`));
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
          Encargados
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          managerDni: "",
          name: "",
          mainPhone: "",
          secondaryPhone: "",
          address: "",
          email: "",
          submit: null
        }}
        title={'Crear encargado'}
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
