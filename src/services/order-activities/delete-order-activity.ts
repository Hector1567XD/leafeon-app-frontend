import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/billing-activities`;

export default async function deleteOrderActivity(
  orderId: number,
  serviceId: number,
  activityId: number,
): Promise<void> {
  try {
    await axios.delete(
      `${URL}/services/${serviceId}/activities/${activityId}/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
