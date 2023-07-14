import { useCallback, useEffect, useState } from 'react';
// material-ui
import BackendError from 'exceptions/backend-error';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../../store/index';
import { Client } from 'core/clients/types';
import getClient from 'services/clients/get-client';

export default function useClientByDni(clientDni: string | null) {
  const dispatch = useAppDispatch();
  const [client, setClient] = useState<Client | null>(null);

  const fetchClient = useCallback(async (clientDni: string) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getClient(clientDni);
      setClient(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (clientDni) fetchClient(clientDni);
  }, [fetchClient, clientDni]);

  return client;
};
