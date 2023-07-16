import { SelectOption } from "components/SelectField";
import { Client } from "core/clients/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllClients from "services/clients/get-all-clients";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useClientsOptions(): SelectOption[] {
  const [clients, setClients] = useState<Client[]>([]);
  const dispatch = useAppDispatch();

  const fetchClients = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllClients();
      setClients(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return clients.map(client => ({
    label: (client.clientDni+' -- '+client.name),
    value: client.clientDni,
  }));
}
