import { useCallback, useEffect, useState } from 'react';
// material-ui
import BackendError from 'exceptions/backend-error';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../../store/index';
import { Agency } from 'core/agencies/types';
import getAgency from 'services/agencies/get-agency';

export default function useAgencyByRif(agencyRif: string | null) {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<Agency | null>(null);

  const fetchAgency = useCallback(async (agencyRif: string) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAgency(agencyRif);
      setState(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (agencyRif) fetchAgency(agencyRif);
  }, [fetchAgency, agencyRif]);

  return state;
};
