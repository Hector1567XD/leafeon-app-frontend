import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/payments`;

export default async function deletePayment(billId: number, paymentId: number): Promise<void> {
  try {
    await axios.delete(
      `${URL}/bill/${billId}/payment/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
