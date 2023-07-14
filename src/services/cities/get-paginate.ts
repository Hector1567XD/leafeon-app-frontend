import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { City } from 'core/cities/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import { PaginateBody, PaginatedResponse } from 'services/types';
import store from 'store';

const URL = `${API_BASE_URL}/cities`;

export default async function getPaginate(body: PaginateBody): Promise<CitiesPaginated> {
  try {
    const urlPaginated = addQueryParams(URL, body);
    const response = await axios.get<CitiesPaginated>(
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

type CitiesPaginated = PaginatedResponse<City>;
