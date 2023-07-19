import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Order } from 'core/orders/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/orders`;

export default async function getOrder(orderId: number): Promise<Order> {
  try {
    const response = await axios.get<Order>(
        `${URL}/${orderId}`, {
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
