import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Coordinator } from 'core/coordinators/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import { PaginateBody, PaginatedResponse } from 'services/types';
import store from 'store';

const URL = `${API_BASE_URL}/employees-coordinate-services`;

export default async function getPaginate(body: PaginateBody, params: CoordinatorPaginatorPayload): Promise<CoordinatorPaginatedResponse> {
  try {
    const response = await axios.get<CoordinatorPaginatedResponse>(
      addQueryParams(URL, { ...body, ...params }), {
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

export type CoordinatorPaginatorPayload = { onlyForAgencyRif: string | null };
export type CoordinatorPaginatedResponse = PaginatedResponse<Coordinator>;
