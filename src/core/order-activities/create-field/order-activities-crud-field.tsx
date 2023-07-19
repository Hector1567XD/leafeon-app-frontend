import { FunctionComponent, useCallback } from "react";
import { styled } from "styled-components";
import OrderActivitiesCrud from "core/order-activities/form/order-activities-crud";
import { FormControl, FormHelperText } from "@mui/material";
import useInput from "./use-input";
import { InputOrderActivity } from "../types";
import { ChangeEventOrderActivities, LocalOrderActivity } from "../form/types";
import { Booking } from "core/bookings/types";

const OrderActivitiesCrudField: FunctionComponent<Props> = (
  {
    inputServices,
    onChange,
    onHandleFormChange,
    fieldName,
    error,
    helperText,
    orderId,
    booking,
    isParentUpdate
  }
) => {
  const onChangeOrderActivitys = useCallback(
    (services: InputOrderActivity[]) => {
      onChange?.(services);

      const changeEventOrderActivities
        = createChangeEvent(fieldName, services);
      onHandleFormChange(changeEventOrderActivities);
    }, [fieldName, onChange, onHandleFormChange]
  );

  const { items, onDelete, onUpdate, onCreate }
    = useInput(orderId, inputServices, onChangeOrderActivitys);

  return (
    <FormControl error={error} fullWidth>
      <OrderActivitiesCrud
        booking={booking}
        isParentUpdate={isParentUpdate}
        orderId={orderId}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onCreate={onCreate}
        items={items}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

interface Props {
  helperText?: string;
  error?: boolean;
  booking: Booking | null;
  fieldName: string;
  className?: string;
  inputServices: LocalOrderActivity[];
  onChange?: (services: InputOrderActivity[]) => void;
  onHandleFormChange: (services: ChangeEventOrderActivities) => void;
  orderId: number;
  isParentUpdate?: boolean;
}

function createChangeEvent(fieldName: string, services: InputOrderActivity[]): ChangeEventOrderActivities
{
  return {
    target: {
      name: fieldName,
      id: fieldName,
      value: services,
    },
  } as unknown as ChangeEventOrderActivities
}

export default styled(OrderActivitiesCrudField)``;
