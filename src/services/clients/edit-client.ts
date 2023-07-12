import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Client } from 'core/clients/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/jobs`;

export default async function editClient(clientDni: number, body: ClientPayload): Promise<Client> {
  try {
    const response = await axios.put<Client>(
        `${URL}/${clientDni}`, body, {
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

export type ClientPayload = Omit<Client, 'JobId' | 'createdAt'>;
