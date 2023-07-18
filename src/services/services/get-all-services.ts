import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { PaginatedService } from 'core/services/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import store from 'store';

const URL = `${API_BASE_URL}/services/all`;

export default async function getAllServices(body: BodyAllServices): Promise<PaginatedService[]> {
  try {
    const urlParametrized = addQueryParams(URL, body);
    const response = await axios.get<PaginatedService[]>(
      urlParametrized, {
        headers: { Authorization: `Bearer ${store.getState().auth.token}` }
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

export type BodyAllServices = {
  onlyForAgencyRif: string | null;
  includeServicesIds: string | null;
}
