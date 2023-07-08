import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { City } from 'core/cities/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/cities`;

export default async function getCity(idCity: number): Promise<City> {
  try {
    const response = await axios.get<City>(
        `${URL}/${idCity}`, {
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
