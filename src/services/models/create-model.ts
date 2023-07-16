import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Model } from 'core/models/types';
import { InputRecommendedService } from 'core/recommended-services/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/models`;

export default async function createModel(body: ModelCreatePayload): Promise<Model> {
  try {
    const response = await axios.post<Model>(
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

export type ModelCreatePayload = Omit<Model, 'createdAt' | 'services'> & {
  services: InputRecommendedService[];
};
