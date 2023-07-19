import axios from "axios";
// Own
import store from "store";
import { FrecuentModelsByService } from "./types";
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";
import { PaginateBody, PaginatedResponse } from "services/types";

const URL = `${API_BASE_URL}/stats/best-selling-products?orderBy=DESC`;

export default async function getFrecuentModelsByService(
  body: PaginateBody
): Promise<bestSellingProductsPaginated> {
  try {
    const urlPaginated = addQueryParams(URL, body);
    const response = await axios.get<bestSellingProductsPaginated>(urlPaginated, {
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

type bestSellingProductsPaginated = PaginatedResponse<FrecuentModelsByService>;
