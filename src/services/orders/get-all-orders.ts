import axios from "axios";
// Own
import store from "store";
import { Order } from "core/orders/types";
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";

const URL = `${API_BASE_URL}/orders/all`;

export default async function getAllOrders(
  onlyWithoutBill = false
): Promise<Order[]> {
  try {
    const urlParametrized = addQueryParams(URL, { onlyWithoutBill });
    const response = await axios.get<Order[]>(urlParametrized, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
