import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import getDiscount from "services/discounts/get-discount";
import { useAppDispatch } from "../../store/index";
import { Discount } from "./types";

export default function useDiscountById(discountId: number | null) {
  const dispatch = useAppDispatch();
  const [discount, setDiscount] = useState<Discount | null>(null);

  const fetchDiscount = useCallback(
    async (discountId: number) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getDiscount(discountId);
        setDiscount(response);
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
    if (discountId) fetchDiscount(discountId);
  }, [fetchDiscount, discountId]);

  return discount;
}
