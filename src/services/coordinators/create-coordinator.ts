import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Coordinator, InputCoordinator } from 'core/coordinators/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/employees-coordinate-services`;

export default async function createCoordinator(body: InputCoordinator):
  Promise<Coordinator>
{
  try {
    const response = await axios.post<Coordinator>(
        URL, body, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
