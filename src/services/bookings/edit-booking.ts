import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Booking } from 'core/bookings/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/bookings`;

export default async function editBooking(idBooking: number, body: BookingPayload): Promise<Booking> {
  try {
    const response = await axios.put<Booking>(
        `${URL}/${idBooking}`, body, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

export type BookingPayload = Omit<Booking, 'BookingId' | 'createdAt'>;
