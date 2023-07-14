import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Job } from 'core/jobs/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/jobs`;

export default async function editJob(idJob: number, body: JobPayload): Promise<Job> {
  try {
    const response = await axios.put<Job>(
        `${URL}/${idJob}`, body, {
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

export type JobPayload = Omit<Job, 'JobId' | 'createdAt'>;
