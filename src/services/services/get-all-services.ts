import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Service } from 'core/services/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/services/all`;

export default async function getAllServices(): Promise<Service[]> {
  try {
    const response = await axios.get<Service[]>(
      URL, {
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