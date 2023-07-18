import { SelectOption } from "components/SelectField";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import { Employee } from "./types";
import getAllEmployees, { Body } from "services/employees/get-all-employees";

export default function useEmployeesOptions(body: Body): SelectOption[] {
  const [items, setItems] = useState<Employee[]>([]);
  const dispatch = useAppDispatch();

  const fetchItems = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllEmployees({
        onlyForAgencyRif: body.onlyForAgencyRif,
      });
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch, body.onlyForAgencyRif]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return items.map(item => ({
    label: item.name,
    value: item.employeeDni,
  }));
}
