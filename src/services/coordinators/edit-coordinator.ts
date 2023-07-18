import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Coordinator, InputCoordinator } from 'core/coordinators/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/employees-coordinate-services`;

export default async function editCoordinator(coordinator: InputCoordinator): Promise<Coordinator> {
  try {
    const formattedUrl = `${URL}/employee/${coordinator.employeeDni}/service/${coordinator.serviceId}`;
    const response = await axios.put<Coordinator>(
      formattedUrl, coordinator, {
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
