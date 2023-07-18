import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { InputRecommendedService } from 'core/recommended-services/types';
import { Service } from 'core/services/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/is-recommended`;

export default async function createRecommendedService(
  modelId: string,
  body: InputRecommendedService
): Promise<Service> {
  try {
    const response = await axios.post<Service>(
        `${URL}/${modelId}`, body, {
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
