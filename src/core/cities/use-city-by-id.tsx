import { useCallback, useEffect, useState } from 'react';
// material-ui
import BackendError from 'exceptions/backend-error';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../store/index';
import { City } from 'core/cities/types';
import getCity from 'services/cities/get-city';

export default function useCityById(cityId: number | null) {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<City | null>(null);

  const fetchCity = useCallback(async (cityId: number) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getCity(cityId);
      setState(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (cityId) fetchCity(cityId);
  }, [fetchCity, cityId]);

  return state;
};
