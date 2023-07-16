import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Booking } from 'core/bookings/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import store from 'store';

const URL = `${API_BASE_URL}/bookings/all`;

export default async function getAllBookings(body?: Body): Promise<Booking[]> {
  try {
    const urlPaginated = addQueryParams(URL, body || {});
    const response = await axios.get<Booking[]>(
      urlPaginated, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

export type Body = {
  onlyWithoutOrder: boolean,
  includeBookingId: number | null,
}
