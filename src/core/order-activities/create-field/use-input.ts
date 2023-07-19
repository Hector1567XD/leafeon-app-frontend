import { useCallback, useEffect, useState } from "react";
import { OrderActivityFormValues } from "../form/form";
import { LocalOrderActivity } from "../form/types";
import convertLocalToOrderActivitysInput from "../form/utils/convert-local-to-recommended-services-input";
import { InputOrderActivity } from "../types";

const useInput =
  (
    orderId: number,
    inputOrderActivities: LocalOrderActivity[],
    onChange: (services: InputOrderActivity[]) => void
  ) => {
  const [items, setItems] = useState<LocalOrderActivity[]>(inputOrderActivities);

  useEffect(() => {
    setItems(inputOrderActivities);
  }, [inputOrderActivities]);

  useEffect(() => {
    const _orderActivities = convertLocalToOrderActivitysInput(orderId, items);
    onChange(_orderActivities);
  }, [items, onChange, orderId]);

  const onDelete = useCallback((_: LocalOrderActivity, index: number) => {
    setItems((prev) => {
      const newServices = [...prev];
      newServices.splice(index, 1);
      return newServices;
    });
  }, []);

  const onUpdate = useCallback((orderActivity: LocalOrderActivity, formValues: OrderActivityFormValues, index: number) => {
    setItems((prev) => {
        const newServices = [...prev];
        newServices[index] = {
          ...orderActivity,
          ...{ ...formValues as unknown as LocalOrderActivity },
        };
        return newServices;
    });
  }, []);

  const onCreate = useCallback((formValues: OrderActivityFormValues) => {
    setItems((prev) => {
      const newServices = [...prev] as LocalOrderActivity[];
      newServices.push(formValues as unknown as LocalOrderActivity);
      return newServices;
    });
  }, []);

  return { items, onDelete, onUpdate, onCreate };
};

export default useInput;
