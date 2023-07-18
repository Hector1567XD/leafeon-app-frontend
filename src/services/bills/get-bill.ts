import axios from "axios";
// Own
import BackendError from "exceptions/backend-error";
import { API_BASE_URL } from "config/constants";
import { Bill } from "core/bills/types";
import store from "store";

const URL = `${API_BASE_URL}/bills`;

export default async function getBill(billId: number): Promise<Bill> {
  try {
    const response = await axios.get<Bill>(`${URL}/${billId}`, {
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
