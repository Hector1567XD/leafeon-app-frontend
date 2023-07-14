import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import BackendError from 'exceptions/backend-error';
import { useNavigate } from 'react-router';
import { setErrorMessage, setIsLoading, setSuccessMessage } from 'store/customizationSlice';
import { useAppDispatch } from 'store';
import Form, { FormValues } from '../form';
import editCity from 'services/cities/edit-city';
import useCityById from 'core/cities/use-city-by-id';
import useCityId from './use-city-id';
import { FormikHelpers } from 'formik';

const EditState: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cityId = useCityId();
  const city = useCityById(cityId);

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await editCity(cityId!, values);
      navigate('/cities');
      dispatch(setSuccessMessage(`Ciudad ${values.name} editada correctamente`));
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
  }, [dispatch, navigate, cityId]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Ciudades
        </Typography>
      </MainCard>
      {
        city && (
          <Form
            initialValues={{
              name: city.name,
              stateId: city.stateId,
              submit: null
            }}
            title={'Editar ciudad'}
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

