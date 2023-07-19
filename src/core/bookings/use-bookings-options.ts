import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import getAllBookings, { Body } from "services/bookings/get-all-bookings";
import { useCallback, useEffect, useState } from "react";
import { SelectOption } from "components/SelectField";
import BackendError from "exceptions/backend-error";
import { useAppDispatch } from "store";
import { SlimBooking } from "./types";

export default function useBookingsOptions({ onlyWithoutOrder, includeBookingId }: Body): SelectOption[] {
  const [items, setItems] = useState<SlimBooking[]>([]);
  const dispatch = useAppDispatch();

  const fetchItems = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllBookings({
        onlyWithoutOrder,
        includeBookingId,
      });
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, onlyWithoutOrder, includeBookingId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return items.map((item) => ({
    label: String(item.bookingId) + ' - ' + item.clientDni,
    value: item.bookingId,
  }));
}
