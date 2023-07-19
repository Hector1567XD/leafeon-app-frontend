import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Order } from 'core/orders/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import { PaginateBody, PaginatedResponse } from 'services/types';
import store from 'store';

const URL = `${API_BASE_URL}/orders`;

export default async function getPaginate(body: PaginateBody): Promise<OrdersPaginated> {
  try {
    const urlPaginated = addQueryParams(URL, body);
    const response = await axios.get<OrdersPaginated>(
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

export type OrdersPaginated = PaginatedResponse<Order>;
