import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/discounts`;

export default async function deleteDiscount(
  discountId: number
): Promise<void> {
  try {
    await axios.delete(`${URL}/${discountId}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
