import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Vehicle } from 'core/vehicles/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/vehicles`;

export default async function editVehicle(vehicleDni: string, body: VehiclePayload): Promise<Vehicle> {
  try {
    const response = await axios.put<Vehicle>(
        `${URL}/${vehicleDni}`, body, {
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
export type VehiclePayload = Omit<Vehicle, 'VehicleDni' >;
