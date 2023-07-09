import { SelectOption } from "components/SelectField";
import { State } from "core/states/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllStates from "services/states/get-all-states";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useStateOptions(): SelectOption[] {
  const [states, setStates] = useState<State[]>([]);
  const dispatch = useAppDispatch();

  const fetchStates = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllStates();
      setStates(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  return states.map(state => ({
    label: state.name,
    value: state.stateId,
  }));
}
