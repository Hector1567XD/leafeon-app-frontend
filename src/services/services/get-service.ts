import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Service } from 'core/services/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/services`;

export default async function getService(idService: number): Promise<Service> {
  try {
    const response = await axios.get<Service>(
        `${URL}/${idService}`, {
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
