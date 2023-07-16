import { SelectOption } from "components/SelectField";
import { Service } from "core/services/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllServices from "services/services/get-all-services";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useServicesOptions(): SelectOption[] {
  const [services, setServices] = useState<Service[]>([]);
  const dispatch = useAppDispatch();

  const fetchServices = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllServices();
      setServices(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return services.map(service => ({
    label: service.description,
    value: service.serviceId,
  }));
}
