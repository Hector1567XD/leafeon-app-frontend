import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { City } from 'core/cities/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import store from 'store';

const URL = `${API_BASE_URL}/cities/all`;

export default async function getAllCities(body?: Body): Promise<City[]> {
  try {
    const urlPaginated = addQueryParams(URL, body || {});
    const response = await axios.get<City[]>(
      urlPaginated, {
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

export type Body = { stateId?: number; };
