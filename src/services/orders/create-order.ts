import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { LocalOrderActivity } from 'core/order-activities/types';
import { Order } from 'core/orders/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/orders`;

export default async function createOrder(body: OrderPayload): Promise<Order> {
  try {
    const response = await axios.post<Order>(
        URL, body, {
        headers: { Authorization: `Bearer ${store.getState().auth.token}` }
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

export type OrderPayload = Omit<Order, 'orderId' | 'createdAt' | 'items' | 'orderActivities' | 'orderProducts'> & {
  activities: LocalOrderActivity[];
};

