import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Model } from 'core/models/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/models`;

export default async function editModel(modelId: string, body: ModelPutPayload):
  Promise<Model>
{
  console.log('ese erorr normalmente sucede cuando', body);
  try {
    const response = await axios.put<Model>(
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

export type ModelPutPayload = Omit<Model, 'modelId' | 'createdAt' | 'services'>;
