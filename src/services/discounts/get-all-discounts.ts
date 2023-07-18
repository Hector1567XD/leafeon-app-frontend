import axios from "axios";
// Own
import store from "store";
import { API_BASE_URL } from "config/constants";
import { Discount } from "core/discounts/types";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";

const URL = `${API_BASE_URL}/discounts/all`;

export default async function getAllDiscounts(): Promise<Discount[]> {
  try {
    const urlParametrized = addQueryParams(URL, {});
    const response = await axios.get<Discount[]>(urlParametrized, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
