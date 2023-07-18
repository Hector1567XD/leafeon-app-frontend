import axios from "axios";
// Own
import store from "store";
import { BillAlled } from "core/bills/types";
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";

const URL = `${API_BASE_URL}/bills/all`;

export default async function getAllBills(): Promise<BillAlled[]> {
  try {
    const urlParametrized = addQueryParams(URL, {});
    const response = await axios.get<BillAlled[]>(urlParametrized, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
