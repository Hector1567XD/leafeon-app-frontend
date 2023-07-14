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
import editState from 'services/states/edit-state';
import useStateById from './use-state-by-id';
import useStateId from './use-state-id';
import { FormikHelpers } from 'formik';

const EditState: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const stateId = useStateId();
  const state = useStateById(stateId);

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await editState(stateId!, values);
      navigate('/states');
      dispatch(setSuccessMessage(`Estado ${values.name} editado correctamente`));
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
      setSubmitting(false);
      dispatch(setIsLoading(false));
    }
  }, [dispatch, navigate, stateId]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Estados
        </Typography>
      </MainCard>
      {
        state && (
          <Form
            initialValues={{
              name: state.name,
              submit: null
            }}
            title={'Editar estado'}
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

export default styled(EditState)`
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

