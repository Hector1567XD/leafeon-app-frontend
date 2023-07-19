import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Recommendation } from 'core/recommendations/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/vehicles`;

export default async function getReccomendations(licensePlate: string, mileage: number): Promise<Recommendation[]> {
  try {
    console.log(`${URL}/license-plate/${licensePlate}/mileage/${mileage}`)
    const response = await axios.get<Recommendation[]>(
        `${URL}/license-plate/${licensePlate}/mileage/${mileage}`, {
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
