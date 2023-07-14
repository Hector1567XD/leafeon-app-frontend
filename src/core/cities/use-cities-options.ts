import { SelectOption } from "components/SelectField";
import { City } from "core/cities/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllCities from "services/cities/get-all-cities";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useCitiesOptions(stateId: number | null): SelectOption[] {
  const [cities, setCities] = useState<City[]>([]);
  const dispatch = useAppDispatch();

  const fetchCities = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllCities(stateId ? { stateId } : {});
      setCities(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [stateId, dispatch]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return cities.map(city => ({
    label: city.name,
    value: city.cityId,
  }));
}
