import { FunctionComponent, useCallback } from 'react';
// material-ui
import MainCard from 'components/cards/MainCard';
import {  Typography } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
//own
import BackendError from 'exceptions/backend-error';
import { useAppDispatch } from 'store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import Form, { FormValues } from '../form';
import editBooking from 'services/bookings/edit-booking';
import useBookingById from './use-booking-by-dni';
import useBookingId from './use-booking-dni';
import { FormikHelpers } from 'formik';

const EditBooking: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bookingId = useBookingId();
  const booking = useBookingById(bookingId);

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await editBooking(bookingId!, values);
      navigate('/bookings');
      dispatch(setSuccessMessage(`Reserva editada correctamente`));
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
  }, [bookingId, navigate, dispatch]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Reservas
        </Typography>
      </MainCard>
      {
        booking && (
          <Form
            isUpdate={true}
            initialValues={{
              expirationDate: booking.expirationDate,
              clientDni: booking.clientDni,
              licensePlate: booking.licensePlate,
              servicesIds: [0],
              submit: null,
            }}
            title={'Editar reserva'}
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

export default styled(EditBooking)`
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

