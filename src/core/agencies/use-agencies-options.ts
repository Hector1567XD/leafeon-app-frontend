import { SelectOption } from "components/SelectField";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import { Agency } from "./types";
import getAllAgencies from "services/agencies/get-all-agencies";

export default function useAgenciesOptions(): SelectOption[] {
  const [items, setItems] = useState<Agency[]>([]);
  const dispatch = useAppDispatch();

  const fetchItems = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllAgencies();
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return items.map(item => ({
    label: item.businessName,
    value: item.agencyRif,
  }));
}
