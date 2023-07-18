import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Model } from 'core/models/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/models/all`;

export default async function getAllModels(): Promise<Model[]> {
  try {
    const response = await axios.get<Model[]>(
      URL, {
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