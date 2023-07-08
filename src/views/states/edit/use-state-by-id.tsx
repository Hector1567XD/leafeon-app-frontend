import { useCallback, useEffect, useState } from 'react';
// material-ui
import BackendError from 'exceptions/backend-error';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../../store/index';
import { State } from 'core/states/types';
import getState from 'services/states/get-state';

export default function useStateById(stateId: number | null) {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<State | null>(null);

  const fetchState = useCallback(async (stateId: number) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getState(stateId);
      setState(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (stateId) fetchState(stateId);
  }, [fetchState, stateId]);

  return state;
};
