import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import getAllOrders, { Body } from "services/orders/get-all-orders";
import { useCallback, useEffect, useState } from "react";
import { SelectOption } from "components/SelectField";
import BackendError from "exceptions/backend-error";
import { useAppDispatch } from "store";
import { Order } from "./types";

export default function useOrderOptions({ onlyWithoutBill, includeOrderId }: Body): SelectOption[] {
  const [items, setItems] = useState<Order[]>([]);
  const dispatch = useAppDispatch();

  const fetchItems = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllOrders({
        onlyWithoutBill,
        includeOrderId,
      });
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, onlyWithoutBill, includeOrderId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return items.map((item) => ({
    label: String(item.orderId),
    value: item.orderId,
  }));
}
