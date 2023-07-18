import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { SupplyLine } from "core/supply-lines/types";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";
import store from "store";

const URL = `${API_BASE_URL}/supply-lines/all`;

export default async function getAllSupplyLines(): Promise<SupplyLine[]> {
  try {
    const urlParametrized = addQueryParams(URL, {});
    const response = await axios.get<SupplyLine[]>(urlParametrized, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
