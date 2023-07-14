import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Manager } from 'core/managers/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/managers`;

export default async function editManager(managerDni: string, body: ManagerPayload): Promise<Manager> {
  try {
    const response = await axios.put<Manager>(
        `${URL}/${managerDni}`, body, {
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

//maybe check later
export type ManagerPayload = Omit<Manager, 'ManagerDni' >;
