import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/is-recommended`;

export default async function deleteRecommendedService(
  modelId: string,
  serviceId: number,
  mileage: number
): Promise<void> {
  try {
    await axios.delete(
        `${URL}/model/${modelId}/service/${serviceId}/mileage/${mileage}`, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

