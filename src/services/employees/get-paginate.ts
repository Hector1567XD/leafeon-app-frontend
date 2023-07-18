import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Employee } from 'core/employees/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import { PaginateBody, PaginatedResponse } from 'services/types';
import store from 'store';

const URL = `${API_BASE_URL}/employees`;

export default async function getPaginate(body: PaginateBody, params: StockPaginatorPayload): Promise<EmployeesPaginatedResponse> {
  try {
    const response = await axios.get<EmployeesPaginatedResponse>(
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

export type StockPaginatorPayload = { onlyForAgencyRif: string | null };
export type EmployeesPaginatedResponse = PaginatedResponse<Employee>;
