import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import BackendError from 'exceptions/backend-error';
import createAgency from 'services/agencies/create-agency';
import { useNavigate } from 'react-router';
import { setSuccessMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../store/index';
import Form from './form';

const CreateService: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
    console.log(values)
    try {
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await createAgency(values);
      navigate('/services');
      dispatch(setSuccessMessage(`Servicio ${values.description} creada correctamente`));
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
          Servicios
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          description: '',
          submit: null
        }}
        title={'Crear servicio'}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateService)`
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
