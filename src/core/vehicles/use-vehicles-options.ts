import { SelectOption } from "components/SelectField";
import { Vehicle } from "core/vehicles/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getVehiclesByClient from "services/vehicles/get-vehicles-by-client";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useVehiclesOptions(clientDni: string | null): SelectOption[] {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const dispatch = useAppDispatch();

  const fetchVehicles = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getVehiclesByClient(clientDni);
      setVehicles(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [clientDni, dispatch]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return vehicles.map(vehicle => ({
    label: (vehicle.licensePlate+' -- '+vehicle.modelId),
    value: vehicle.licensePlate,
  }));
}
