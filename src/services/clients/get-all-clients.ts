import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Client } from 'core/clients/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import store from 'store';

const URL = `${API_BASE_URL}/clients`;

export default async function getAllClients(body?: Body): Promise<Client[]> {
  try {
    const urlPaginated = addQueryParams(URL, body || {});
    const response = await axios.get<Client[]>(
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

export type Body = { clientDni?: number; };