import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import BackendError from 'exceptions/backend-error';
import { useNavigate } from 'react-router';
import { setErrorMessage, setIsLoading, setSuccessMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../../store/index';
import Form, { FormValues } from '../form';
import editManager from 'services/managers/edit-manager';
import useManagerByDni from './use-manager-by-dni';
import useManagerDni from './use-manager-dni';
import { FormikHelpers } from 'formik';

const EditManager: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const managerDni = useManagerDni();
  const manager = useManagerByDni(managerDni);

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await editManager(managerDni!, values);
      navigate('/managers');
      dispatch(setSuccessMessage(`Encargado ${values.name} editado correctamente`));
    } catch (error) {
      if (error instanceof BackendError) {
        setErrors({
          ...error.getFieldErrorsMessages(),
          submit: error.getMessage()
        });
        dispatch(setErrorMessage(error.getMessage()));
      }
      setStatus({ success: false });
    } finally {
      dispatch(setIsLoading(false));
      setSubmitting(false);
    }
  }, [dispatch, navigate, managerDni]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Encargados
        </Typography>
      </MainCard>
      {
        manager && (
          <Form
            isUpdate={true}
            initialValues={{
              managerDni: manager.managerDni,
              name: manager.name,
              mainPhone: manager.mainPhone,
              secondaryPhone: manager.secondaryPhone,
              address: manager.address,
              email: manager.email,
              submit: null
            }}
            title={'Editar encargado'}
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

export default styled(EditManager)`
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

