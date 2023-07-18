import { useCallback, useEffect, useState } from 'react';
// material-ui
import BackendError from 'exceptions/backend-error';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../../store/index';
import { Vehicle } from 'core/vehicles/types';
import getVehicle from 'services/vehicles/get-vehicle';

export default function useVehicleByLicense(licensePlate: string | null) {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<Vehicle | null>(null);

  const fetchVehicle = useCallback(async (licensePlate: string) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getVehicle(licensePlate);
      setState(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (licensePlate) fetchVehicle(licensePlate);
  }, [fetchVehicle, licensePlate]);

  return state;
};
