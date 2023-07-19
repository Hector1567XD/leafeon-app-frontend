import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Activity } from 'core/activities/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import store from 'store';

const URL = `${API_BASE_URL}/activities/all`;

export default async function getAllActivities(body?: Body): Promise<Activity[]> {
  try {
    const urlPaginated = addQueryParams(URL, body || {});
    const response = await axios.get<Activity[]>(
      urlPaginated, {
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

export type Body = {
  onlyForAgencyRif: string | null,
}
