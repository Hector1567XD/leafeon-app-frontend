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
import Form from '../form';
import editOrder from 'services/orders/edit-order';
import useOrderById from 'core/orders/use-order-by-id';
import useOrderId from 'core/orders/use-order-id';
import { FormikHelpers } from 'formik';
import { FormValues } from '../form/types';

const EditOrder: FunctionComponent<Props> = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const orderId = useOrderId();
  const order = useOrderById(orderId);

  const onSubmit = useCallback(async (values: any, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await editOrder(orderId!, {
        entryTime: values.entryTime,
        estimatedDeparture: values.estimatedDeparture,
        bookingId: values.bookingId,
        employeeDni: values.employeeDni,
        responsibleDni: values.responsibleDni,
        responsibleName: values.responsibleName,
        realDeparture: values.realDeparture,
      });
      navigate('/orders');
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
  }, [dispatch, orderId, navigate]);

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Ordenes
        </Typography>
      </MainCard>
      {
        order && (
          <Form
            isUpdate={true}
            initialValues={{
              entryTime: order.entryTime,
              estimatedDeparture: order.estimatedDeparture,
              bookingId: order.bookingId,
              employeeDni: order.employeeDni,
              responsibleDni: order.responsibleDni,
              responsibleName: order.responsibleName,
              activities: order.orderActivities,
              realDeparture: order.realDeparture,
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

export default styled(EditOrder)`
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

