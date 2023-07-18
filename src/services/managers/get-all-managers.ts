import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Manager } from 'core/managers/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import store from 'store';

const URL = `${API_BASE_URL}/managers/all`;

export default async function getAllManagers(body?: Body): Promise<Manager[]> {
  try {
    const urlParametrized = addQueryParams(URL, body || {});
    const response = await axios.get<Manager[]>(
      urlParametrized, {
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

export type Body = {
  onlyAvailable: boolean,
  includeManager: string | null,
}
