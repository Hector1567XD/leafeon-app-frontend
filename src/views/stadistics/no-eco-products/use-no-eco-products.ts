import { useCallback, useEffect, useState } from "react";
// Own
import { useAppDispatch } from "store";
import BackendError from "exceptions/backend-error";
import getNoEcoProducts from "services/stadistics/get-no-eco-products";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";

export interface NoEcoProductsItem {
  label: string;
  value: number;
}

export default function useNoEcoProducts() {
  const dispatch = useAppDispatch();
  const [agencyRif, setAgencyRif] = useState<string>("");
  const [items, setNoEcoProducts] = useState<NoEcoProductsItem[]>([]);

  const fetchNoEcoProducts = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getNoEcoProducts(agencyRif);
      const { nonEcologicalPercentage } = response;
      const difference = 100 - nonEcologicalPercentage;
      const itemsValue = [
        {
          label: "Ecologicos",
          value: difference,
        },
        {
          label: "No ecologicos",
          value: nonEcologicalPercentage,
        },
      ];
      setNoEcoProducts(itemsValue);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [agencyRif, dispatch]);

  useEffect(() => {
    fetchNoEcoProducts();
  }, [fetchNoEcoProducts]);

  return { items, fetchNoEcoProducts, agencyRif, setAgencyRif };
}
