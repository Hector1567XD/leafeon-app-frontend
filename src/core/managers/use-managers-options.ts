import { SelectOption } from "components/SelectField";
import { Manager } from "core/managers/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllManagers, { Body } from "services/managers/get-all-managers";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useManagersOptions(body: Body): SelectOption[] {
  const [items, setItems] = useState<Manager[]>([]);
  const dispatch = useAppDispatch();

  const fetchItems = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllManagers({
        onlyAvailable: body.onlyAvailable,
        includeManager: body.includeManager,
      });
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [body.onlyAvailable, body.includeManager, dispatch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return items.map(item => ({
    label: item.name,
    value: item.managerDni,
  }));
}

