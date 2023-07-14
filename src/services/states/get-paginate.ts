import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { State } from 'core/states/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import { PaginateBody, PaginatedResponse } from 'services/types';
import store from 'store';

const URL = `${API_BASE_URL}/states`;

export default async function getPaginate(body: PaginateBody): Promise<StatePaginatedResponse> {
  try {
    const response = await axios.get<StatePaginatedResponse>(
      addQueryParams(URL, body), {
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

export type StatePaginatedResponse = PaginatedResponse<State>;
