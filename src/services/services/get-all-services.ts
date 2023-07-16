import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { PaginatedService } from 'core/services/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/services/all`;

export default async function getAllServices(): Promise<PaginatedService[]> {
  try {
    const response = await axios.get<PaginatedService[]>(
        `${URL}`, {
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
