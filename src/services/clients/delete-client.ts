import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Client } from 'core/clients/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/clients`;

export default async function deleteClient(clientDni: string): Promise<Client> {
  try {
    const response = await axios.delete<Client>(
      `${URL}/${clientDni}`, {
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

export type ClientPayload = Omit<Client, 'clientDni' | 'createdAt'>;
