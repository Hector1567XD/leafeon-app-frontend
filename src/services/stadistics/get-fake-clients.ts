import axios from "axios";
// Own
import store from "store";
import { FakeClientsItem } from "./types";
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";
import { PaginateBody, PaginatedResponse } from "services/types";

const URL = `${API_BASE_URL}/stats/fake-clients`;

export default async function getFakeClients(
  body: PaginateBody
): Promise<FakeClientsPaginated> {
  try {
    const urlPaginated = addQueryParams(URL, body);
    const response = await axios.get<FakeClientsPaginated>(urlPaginated, {
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

type FakeClientsPaginated = PaginatedResponse<FakeClientsItem>;
