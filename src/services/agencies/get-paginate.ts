import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Agency } from 'core/agencies/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import { PaginateBody, PaginatedResponse } from 'services/types';
import store from 'store';

const URL = `${API_BASE_URL}/agencies`;

export default async function getPaginate(body: PaginateBody): Promise<AgenciesPaginated> {
  try {
    const urlPaginated = addQueryParams(URL, body);
    const response = await axios.get<AgenciesPaginated>(
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

type AgenciesPaginated = PaginatedResponse<Agency>;
