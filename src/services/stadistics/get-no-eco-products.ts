import axios from "axios";
// Own
import store from "store";
import { API_BASE_URL } from "config/constants";
import { NoEcoProductsResponse } from "./types";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";

const URL = `${API_BASE_URL}/stats/no-eco-products-all`;
const URLBYAGENCY = `${API_BASE_URL}/stats/no-eco-products-by-agency`;

export default async function getNoEcoProducts(
  agencyRif: string
): Promise<NoEcoProductsResponse> {
  try {
    const url = agencyRif.length ? URLBYAGENCY : URL;
    const urlParametrized = agencyRif.length
      ? `${url}/${agencyRif}`
      : addQueryParams(url, {});
    const response = await axios.get(urlParametrized, {
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
