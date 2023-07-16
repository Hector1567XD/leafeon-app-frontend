import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Stock } from 'core/stocks/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import { PaginateBody, PaginatedResponse } from 'services/types';
import store from 'store';

const URL = `${API_BASE_URL}/stocks`;

export default async function getPaginate(body: PaginateBody, params: StockPaginatorPayload): Promise<StockPaginatedResponse> {
  try {
    const response = await axios.get<StockPaginatedResponse>(
      addQueryParams(URL, { ...body, ...params }), {
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

export type StockPaginatorPayload = { onlyForAgencyRif: string | null };
export type StockPaginatedResponse = PaginatedResponse<Stock>;
