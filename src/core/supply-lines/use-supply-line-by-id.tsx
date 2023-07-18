import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import getSupplyLine from "services/supply-lines/get-supply-line";
import { useAppDispatch } from "../../store/index";
import { SupplyLine } from "./types";

export default function useSupplyLineById(supplyLineId: number | null) {
  const dispatch = useAppDispatch();
  const [supplyLine, setSupplyLine] = useState<SupplyLine | null>(null);

  const fetchSupplyLine = useCallback(
    async (supplyLineId: number) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getSupplyLine(supplyLineId);
        setSupplyLine(response);
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
    if (supplyLineId) fetchSupplyLine(supplyLineId);
  }, [fetchSupplyLine, supplyLineId]);

  return supplyLine;
}
