import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Payment } from 'core/payments/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/payments`;

export default async function createPayment(body: PaymentPayload): Promise<Payment> {
  try {
    const response = await axios.post<Payment>(
        URL, body, {
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

export type PaymentPayload = Omit<Payment, 'PaymentId' | 'createdAt'>;
