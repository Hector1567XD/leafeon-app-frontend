import { FunctionComponent, useCallback } from "react";
import { styled } from "styled-components";
import OrderActivitiesCrud from "core/order-activities/form/order-activities-crud";
import { FormControl } from "@mui/material";
import { OrderActivity } from "../types";
import { LocalOrderActivity } from "../form/types";
import deleteOrderActivity from "services/order-activities/delete-order-activity";
import editOrderActivity from "services/order-activities/edit-order-activity";
import { OrderActivityFormValues } from "../form/form";
import createOrderActivity from "services/order-activities/create-order-activity";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading, setSuccessMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import { Booking } from "core/bookings/types";

const OrderActivitiesCrudWrapper: FunctionComponent<Props> = (
  {
    className,
    onRefresh,
    items,
    booking,
    orderId,
  }
) => {
  const dispatch = useAppDispatch();

  const onDelete = useCallback(async (orderActivity: LocalOrderActivity, index: number) => {
    try {
      dispatch(setIsLoading(true));
      await deleteOrderActivity(
        orderId,
        orderActivity.serviceId,
        orderActivity.activityId
      )
      dispatch(setSuccessMessage(`Activdad de orden eliminada con éxito`));
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
      onRefresh();
    }
  }, [dispatch, orderId, onRefresh]);

  const onUpdate = useCallback(async (orderActivity: LocalOrderActivity, formValues: OrderActivityFormValues, index: number) => {
    try {
      await editOrderActivity(
        orderId,
        orderActivity.serviceId,
        orderActivity.activityId,
        {
          employeeDni: formValues.employeeDni!!,
          hoursTaken: +formValues.hoursTaken,
        }
      )
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
      onRefresh();
    }
  }, [dispatch, orderId, onRefresh]);

  const onCreate = useCallback(async (formValues: OrderActivityFormValues) => {
    try {
      await createOrderActivity(
        {
          orderId,
          serviceId: +formValues.serviceId!!,
          activityId: +formValues.activityId!!,
          employeeDni: formValues.employeeDni!!,
          hoursTaken: +formValues.hoursTaken,
        },
      );
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
      onRefresh();
    }
  }, [dispatch, orderId, onRefresh]);

  return (
    <FormControl className={className} fullWidth>
      <OrderActivitiesCrud
        booking={booking}
        isParentUpdate={true}
        orderId={orderId}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onCreate={onCreate}
        items={items}
      />
    </FormControl>
  );
};

interface Props {
  className?: string;
  orderId: number;
  onRefresh: () => void;
  booking: Booking;
  items: OrderActivity[];
}

export default styled(OrderActivitiesCrudWrapper)``;
