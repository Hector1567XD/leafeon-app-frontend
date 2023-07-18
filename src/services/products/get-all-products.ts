import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Product } from 'core/products/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import store from 'store';

const URL = `${API_BASE_URL}/products/all`;

export default async function getAllProducts(): Promise<Product[]> {
  try {
    const urlParametrized = addQueryParams(URL, {});
    const response = await axios.get<Product[]>(
      urlParametrized, {
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

