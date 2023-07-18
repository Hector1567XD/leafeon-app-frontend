import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import getProduct from "services/products/get-product";
import { useAppDispatch } from "../../store/index";
import { Product } from "./types";

export default function useProductById(productId: number | null) {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProduct = useCallback(
    async (productId: number) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getProduct(productId);
        setProduct(response);
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
    if (productId) fetchProduct(productId);
  }, [fetchProduct, productId]);

  return product;
}
