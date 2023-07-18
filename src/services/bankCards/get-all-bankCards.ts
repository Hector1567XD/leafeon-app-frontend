import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { BankCard } from 'core/bankCards/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import store from 'store';

const URL = `${API_BASE_URL}/card-banks`;

export default async function getAllBankCards(body?: Body): Promise<BankCard[]> {
  try {
    const urlPaginated = addQueryParams(URL, body || {});
    console.log('hola '+urlPaginated)
    const response = await axios.get<BankCard[]>(
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

export type Body = { bankCardId?: number; };