import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import getAllOrders from "services/orders/get-all-orders";
import { useCallback, useEffect, useState } from "react";
import { SelectOption } from "components/SelectField";
import BackendError from "exceptions/backend-error";
import { useAppDispatch } from "store";
import { Order } from "./types";

export default function useOrderOptions(): SelectOption[] {
  const [items, setItems] = useState<Order[]>([]);
  const dispatch = useAppDispatch();

  const fetchItems = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllOrders(true);
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return items.map((item) => ({
    label: String(item.orderId),
    value: item.orderId,
  }));
}
