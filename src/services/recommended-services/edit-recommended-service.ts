import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { InputActivity } from 'core/activities/types';
import { Service } from 'core/services/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/is-recommended`;

export default async function editRecommendedService(
  modelId: string,
  serviceId: number,
  mileage: number,
  body: ServiceUpdatePayload
):
  Promise<Service>
{
  try {
    const response = await axios.put<Service>(
      `${URL}/model/${modelId}/service/${serviceId}/mileage/${mileage}`,
      body,
      {
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

export interface ServiceUpdatePayload {
  useTime: number;
};
