import { useCallback, useEffect, useState } from 'react';
// material-ui
import BackendError from 'exceptions/backend-error';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../../store/index';
import { Payment } from 'core/payments/types';
import getPayment from 'services/payments/get-payment';

export default function usePaymentById(billId: number | null, paymentId: number | null) {
  const dispatch = useAppDispatch();
  
  const [payment, setPayment] = useState<Payment | null>(null);

  const fetchPayment = useCallback(async (billId: number, paymentId: number) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPayment(billId, paymentId);
      setPayment(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (billId && paymentId) fetchPayment(billId, paymentId);
  }, [billId, fetchPayment, paymentId]);

  return payment;
};
