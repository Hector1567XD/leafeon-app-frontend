import { useCallback, useEffect, useState } from "react";
// material-ui
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import { useAppDispatch } from "../../store/index";
import getBill from "services/bills/get-bill";
import { Bill } from "./types";

export default function useBillById(billId: number | null) {
  const dispatch = useAppDispatch();
  const [bill, setBill] = useState<Bill | null>(null);

  const fetchBill = useCallback(
    async (billId: number) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getBill(billId);
        setBill(response);
      } catch (error) {
        if (error instanceof BackendError)
          dispatch(setErrorMessage(error.getMessage()));
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (billId) fetchBill(billId);
  }, [fetchBill, billId]);

  return bill;
}
