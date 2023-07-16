import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { InputCoordinator } from 'core/coordinators/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/employees-coordinate-services`;

export default async function deleteCoordinator
  (coordinator: Pick<InputCoordinator, 'employeeDni' | 'serviceId'>):
  Promise<void>
{
  try {
    const formattedUrl = `${URL}/employee/${coordinator.employeeDni}/service/${coordinator.serviceId}`;
    await axios.delete(
      formattedUrl,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
