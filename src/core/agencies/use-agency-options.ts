import { SelectOption } from "components/SelectField";
import { Agency } from "core/agencies/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllAgencies from "services/agencies/get-all-agencies";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useAgencyOptions(): SelectOption[] {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const dispatch = useAppDispatch();

  const fetchAgencies = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllAgencies();
      setAgencies(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAgencies();
  }, [fetchAgencies]);

  return agencies.map(agency => ({
    label: agency.businessName,
    value: agency.agencyRif,
  }));
}
