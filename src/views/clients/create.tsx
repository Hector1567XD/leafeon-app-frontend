import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import BackendError from 'exceptions/backend-error';
import createClient from 'services/clients/create-client';
import { useNavigate } from 'react-router';
import { setErrorMessage, setIsLoading, setSuccessMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../store/index';
import Form from './form';

const CreateClient: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(async (values: any) => {
    try {
      dispatch(setIsLoading(true));
      await createClient(values);
      navigate('/clients');
      dispatch(setSuccessMessage(`Cliente ${values.name} creado correctamente`));
    } catch (error) {
      if (error instanceof BackendError) {
        if (error instanceof BackendError) {
          dispatch(setErrorMessage(error.getMessage()));
        }
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, navigate]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Clientes
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          clientDni: '',
          name: '',
          email: '',
          mainPhone: '',
          secondaryPhone: '',
          submit: null
        }}
        title={'Crear cliente'}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateClient)`
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
