import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { InputActivity } from 'core/activities/types';
import { Service } from 'core/services/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/services`;

export default async function createService(body: ServiceCreatePayload): Promise<Service> {
  try {
    const response = await axios.post<Service>(
        URL, body, {
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

export interface ServiceCreatePayload {
  description: string
  activities: InputActivity[];
};
