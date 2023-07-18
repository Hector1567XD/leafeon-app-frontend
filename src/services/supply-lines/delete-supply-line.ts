import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/supply-lines`;

export default async function deleteSupplyLine(
  supplyLineId: number
): Promise<void> {
  try {
    await axios.delete(`${URL}/${supplyLineId}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
