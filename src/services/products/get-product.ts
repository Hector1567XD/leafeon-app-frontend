import axios from 'axios';
// Own
import BackendError from 'exceptions/backend-error';
import { API_BASE_URL } from 'config/constants';
import { Product } from 'core/products/types';
import store from 'store';

const URL = `${API_BASE_URL}/products`;

export default async function getProduct(productId: number): Promise<Product> {
  try {
    const response = await axios.get<Product>(
        `${URL}/${productId}`, {
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
