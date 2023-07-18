import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Vehicle } from 'core/vehicles/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/vehicles`;

export default async function createVehicle(body: VehiclePayload): Promise<Vehicle> {
  try {
    console.log('hola bb'+JSON.stringify(body))
    
    const response = await axios.post<Vehicle>(
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

export type VehiclePayload = Omit<Vehicle, 'createdAt'>;
