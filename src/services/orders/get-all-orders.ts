import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Order } from 'core/orders/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import store from 'store';

const URL = `${API_BASE_URL}/orders/all`;

export default async function getAllOrders(body?: Body): Promise<Order[]> {
  try {
    const urlPaginated = addQueryParams(URL, body || {});
    console.log('hola '+urlPaginated)
    const response = await axios.get<Order[]>(
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
  onlyWithoutBill: boolean,
  includeOrderId: number | null,
}
