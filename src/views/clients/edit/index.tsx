import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
//own
import BackendError from 'exceptions/backend-error';
import { useAppDispatch } from '../../../store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import Form from '../form';
import editClient from 'services/clients/edit-client';
import useClientByDni from './use-client-by-dni';
import useClientDni from './use-client-dni';

const EditClient: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const clientDni = useClientDni();
  const client = useClientByDni(clientDni);

  const onSubmit = useCallback(async (values: any) => {
    try {
      dispatch(setIsLoading(true));
      await editClient(clientDni!, values);
      navigate('/clients');
      dispatch(setSuccessMessage(`Cliente ${values.name} editado correctamente`));
    } catch (error) {
      if (error instanceof BackendError) {
        if (error instanceof BackendError) {
          dispatch(setErrorMessage(error.getMessage()));
        }
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [clientDni, navigate, dispatch]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Clientes
        </Typography>
      </MainCard>
      {
        client && (
          <Form
            initialValues={{
              clientDni: client.clientDni,
              name: client.name,
              email: client.email,
              mainPhone: client.mainPhone,
              secondaryPhone: client.secondaryPhone,
              submit: null
            }}
            title={'Editar cliente'}
            onSubmit={onSubmit}
          />
        )
      }
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditClient)`
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

