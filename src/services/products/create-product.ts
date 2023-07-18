import axios from "axios";
// Own
import store from "store";
import { Product } from "core/products/types";
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";

const URL = `${API_BASE_URL}/products`;

export default async function createProduct(
  body: ProductPayload
): Promise<Product> {
  try {
    const response = await axios.post<Product>(URL, body, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

export type ProductPayload = Omit<Product, "createdAt">;
