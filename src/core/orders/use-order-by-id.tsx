import { useCallback, useEffect, useState } from 'react';
// material-ui
import BackendError from 'exceptions/backend-error';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../store/index';
import getOrder from 'services/orders/get-order';
import { Order } from './types';

export default function useOrderById(orderId: number | null) {
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<Order | null>(null);

  const fetchItem = useCallback(async (orderId: number) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getOrder(orderId);
      setItem(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (orderId) fetchItem(orderId);
  }, [fetchItem, orderId]);

  return item;
};
