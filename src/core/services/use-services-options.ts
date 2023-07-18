import { SelectOption } from "components/SelectField";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllServices from "services/services/get-all-services";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import { PaginatedService } from "./types";

export default function useServicesOptions({ onlyForAgencyRif, includeServicesIds }: {
  onlyForAgencyRif: string | null;
  includeServicesIds?: number[] | null;
}): SelectOption[] {
  const [items, setItems] = useState<PaginatedService[]>([]);
  const dispatch = useAppDispatch();

  const includeServicesIdsText: string | null = includeServicesIds?.join(',') ?? null;

  const fetchItems = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllServices({
        onlyForAgencyRif,
        includeServicesIds: includeServicesIdsText,
      });
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch, onlyForAgencyRif, includeServicesIdsText]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return items.map(item => ({
    label: item.description,
    value: item.serviceId,
  }));
}
