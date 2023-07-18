import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Stock, InputStock } from 'core/stocks/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/stocks`;

export default async function editStock(stock: InputStock): Promise<Stock> {
  try {
    const formattedUrl = 
      `${URL}/product/${stock.productId}/agency/${stock.agencyRif}`;
    const response = await axios.put<Stock>(
      formattedUrl, stock, {
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
