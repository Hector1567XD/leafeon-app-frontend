import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Manager } from 'core/managers/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/managers`;

export default async function createManager(body: ManagerPayload): Promise<Manager> {
  try {
    console.log('hola bb'+JSON.stringify(body))
    
    const response = await axios.post<Manager>(
        URL, body, {
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

export type ManagerPayload = Omit<Manager, 'ManagerDni' | 'createdAt'>;
