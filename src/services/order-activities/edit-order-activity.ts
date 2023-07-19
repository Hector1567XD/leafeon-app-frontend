import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Service } from 'core/services/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/billing-activities`;

export default async function editOrderActivity(
  orderId: number,
  serviceId: number,
  activityId: number,
  body: OrderActivityUpdatePayload
):
  Promise<Service>
{
  try {
    const response = await axios.put<Service>(
      `${URL}/services/${serviceId}/activities/${activityId}/orders/${orderId}`,
      body,
      {
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

export interface OrderActivityUpdatePayload {
  employeeDni: string;
  hoursTaken: number;
};
