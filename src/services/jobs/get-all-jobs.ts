import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Job } from 'core/jobs/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import store from 'store';

const URL = `${API_BASE_URL}/jobs`;

export default async function getAllJobs(body?: Body): Promise<Job[]> {
  try {
    const urlPaginated = addQueryParams(URL, body || {});
    console.log('hola '+urlPaginated)
    const response = await axios.get<Job[]>(
      urlPaginated, {
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

export type Body = { jobId?: number; };