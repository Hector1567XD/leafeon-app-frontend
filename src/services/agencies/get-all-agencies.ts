import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Agency } from 'core/agencies/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/agencies/all`;

export default async function getAllAgencies(): Promise<Agency[]> {
  try {
    const response = await axios.get<Agency[]>(
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