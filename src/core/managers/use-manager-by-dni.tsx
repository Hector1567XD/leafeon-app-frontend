import { useCallback, useEffect, useState } from 'react';
// material-ui
import BackendError from 'exceptions/backend-error';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from 'store';
import { Manager } from 'core/managers/types';
import getManager from 'services/managers/get-manager';

export default function useManagerByDni(managerDni: string | null) {
  const dispatch = useAppDispatch();
  const [manager, setManager] = useState<Manager | null>(null);

  const fetchManager = useCallback(async (managerDni: string) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getManager(managerDni);
      setManager(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (managerDni) fetchManager(managerDni);
  }, [fetchManager, managerDni]);

  return manager;
};
