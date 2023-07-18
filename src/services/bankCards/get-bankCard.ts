import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { BankCard } from 'core/bankCards/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/card-banks`;

export default async function getBankCard(cardNumber: string): Promise<BankCard> {
  try {
    const response = await axios.get<BankCard>(
        `${URL}/${cardNumber}`, {
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
