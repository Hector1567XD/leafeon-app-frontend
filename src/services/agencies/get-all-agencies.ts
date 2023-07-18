import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Agency } from 'core/agencies/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import store from 'store';

const URL = `${API_BASE_URL}/agencies/all`;

export default async function getAllAgencies(): Promise<Agency[]> {
  try {
    const urlParametrized = addQueryParams(URL, {});
    const response = await axios.get<Agency[]>(
      urlParametrized, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
    console.log('get-all-agencies', response.data);
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
