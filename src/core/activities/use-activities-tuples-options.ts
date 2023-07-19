import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import getAllActivities, { Body } from "services/activities/get-all-activities";
import { useCallback, useEffect, useState } from "react";
import { SelectOption } from "components/SelectField";
import BackendError from "exceptions/backend-error";
import { useAppDispatch } from "store";
import { Activity } from "./types";

export default function useActivitiesTuplesOptions({ onlyForAgencyRif }: Body): SelectOption[] {
  const [items, setItems] = useState<Activity[]>([]);
  const dispatch = useAppDispatch();

  const fetchItems = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllActivities({ onlyForAgencyRif });
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, onlyForAgencyRif]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return items.map((item) => ({
    label: item.description,
    value: JSON.stringify({ serviceId: item.serviceId, activityId: item.activityId }),
  }));
}
