import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Vehicle } from 'core/vehicles/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/vehicles/client`;

export default async function getVehicleByClient(clietnDni: string | null): Promise<Vehicle[]> {
  try {
    const response = await axios.get<Vehicle[]>(
        `${URL}/${clietnDni}`, {
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
