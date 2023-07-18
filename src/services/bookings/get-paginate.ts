import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Booking } from 'core/bookings/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import { PaginateBody, PaginatedResponse } from 'services/types';
import store from 'store';

const URL = `${API_BASE_URL}/bookings`;

export default async function getPaginate(body: PaginateBody): Promise<BookingsPaginated> {
  try {
    const urlPaginated = addQueryParams(URL, body);
    const response = await axios.get<BookingsPaginated>(
      urlPaginated, {
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

type BookingsPaginated = PaginatedResponse<Booking>;
