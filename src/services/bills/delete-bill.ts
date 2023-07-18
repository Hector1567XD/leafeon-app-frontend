import axios from "axios";
// Own
import BackendError from "exceptions/backend-error";
import { API_BASE_URL } from "config/constants";
import store from "store";

const URL = `${API_BASE_URL}/bills`;

export default async function deleteBill(billId: number): Promise<void> {
  try {
    await axios.delete(`${URL}/${billId}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
