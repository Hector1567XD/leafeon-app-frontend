import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import BackendError from 'exceptions/backend-error';
import { useNavigate } from 'react-router';
import { setSuccessMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../../store/index';
import Form from '../form';
//import editService from 'services/services/edit-service';
import useServiceId from './use-service-id';
import useServiceById from './use-service-by-id';

const EditService: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const serviceId = useServiceId();
  const service = useServiceById(serviceId);

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
    try {
      setErrors({});
      setStatus({});
      setSubmitting(true);
      //await editService(serviceId!, values);
      navigate('/services');
      dispatch(setSuccessMessage(`Servicio ${values.description} editado correctamente`));
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
  }, [dispatch, navigate, serviceId]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Servicios
        </Typography>
      </MainCard>
      {
        service && (
          <Form
            initialValues={{
              description: service.description,
              submit: null
            }}
            isUpdate={true}
            title={'Editar servicio'}
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

export default styled(EditService)`
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

