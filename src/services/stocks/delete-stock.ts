import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { InputStock } from 'core/stocks/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/stocks`;

export default async function deleteStock
  (stock: Pick<InputStock, 'productId' | 'agencyRif'>):
  Promise<void>
{
  try {
    const formattedUrl = `${URL}/product/${stock.productId}/agency/${stock.productId}`;
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
