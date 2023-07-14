import { useCallback, useEffect, useState } from 'react';
// material-ui
import BackendError from 'exceptions/backend-error';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from 'store';
import { Service } from 'core/services/types';
import getService from 'services/services/get-service';

export default function useServiceById(serviceId: number | null) {
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<Service | null>(null);

  const fetchItem = useCallback(async (serviceId: number) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getService(serviceId);
      setItem(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (serviceId) fetchItem(serviceId);
  }, [fetchItem, serviceId]);

  return item;
};
