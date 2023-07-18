import axios from "axios";
// Own
import store from "store";
import { Bill } from "core/bills/types";
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";
import { PaginateBody, PaginatedResponse } from "services/types";

const URL = `${API_BASE_URL}/bills`;

export default async function getPaginate(
  body: PaginateBody
): Promise<BillsPaginated> {
  try {
    const urlPaginated = addQueryParams(URL, body);
    const response = await axios.get<BillsPaginated>(urlPaginated, {
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

type BillsPaginated = PaginatedResponse<Bill>;
