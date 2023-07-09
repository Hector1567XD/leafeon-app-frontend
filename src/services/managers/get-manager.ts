import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Manager } from 'core/managers/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/managers`;

export default async function getManager(managerDni: string): Promise<Manager> {
  try {
    const response = await axios.get<Manager>(
        `${URL}/${managerDni}`, {
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
