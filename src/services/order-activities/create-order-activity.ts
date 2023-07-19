import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { InputOrderActivity } from 'core/order-activities/types';
import { Service } from 'core/services/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/billing-activities`;

export default async function createOrderActivity(
  body: InputOrderActivity
): Promise<Service> {
  try {
    const response = await axios.post<Service>(
        `${URL}`, body, {
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
