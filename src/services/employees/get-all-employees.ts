import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Employee } from 'core/employees/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import store from 'store';

const URL = `${API_BASE_URL}/employees/all`;

export default async function getAllEmployees(body?: Body): Promise<Employee[]> {
  try {
    const urlParametrized = addQueryParams(URL, body || {});
    const response = await axios.get<Employee[]>(
      urlParametrized, {
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

export type Body = { employeeDni?: string | null; onlyForAgencyRif: string | null, };
