import { useCallback, useEffect, useState } from 'react';
// material-ui
import BackendError from 'exceptions/backend-error';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import { useAppDispatch } from '../../store/index';
import { Booking } from 'core/bookings/types';
import getBooking from 'services/bookings/get-booking';

export default function useBookingById(bookingId: number | null) {
  const dispatch = useAppDispatch();
  const [booking, setBooking] = useState<Booking | null>(null);

  const fetchBooking = useCallback(async (bookingId: number) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getBooking(bookingId);
      setBooking(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (bookingId) fetchBooking(bookingId);
  }, [fetchBooking, bookingId]);

  return booking;
};
