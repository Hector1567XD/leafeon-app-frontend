import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Recommendation } from 'core/recommendations/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/vehicles`;

export default async function getReccomendations(licensePlate: string , mileage: number, agencyRif: string): Promise<Recommendation[]> {
  try {
    const _agencyRif = (!!agencyRif && agencyRif !== '') ? agencyRif : 'dumm';
    const finalUrl = `${URL}/license-plate/${(!!licensePlate && licensePlate !== '') ? licensePlate : 'dumm'}/mileage/${mileage}/agencyRif/${_agencyRif}`
    console.log('finalUrl recomendados', finalUrl)
    const response = await axios.get<Recommendation[]>(
      finalUrl, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
    console.log('respuesta recomendados', response.data)
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
