import axios from "axios";
// Own
import BackendError from "exceptions/backend-error";
import { API_BASE_URL } from "config/constants";
import { Discount } from "core/discounts/types";
import store from "store";

const URL = `${API_BASE_URL}/discounts`;

export default async function getDiscount(
  discountId: number
): Promise<Discount> {
  try {
    const response = await axios.get<Discount>(`${URL}/${discountId}`, {
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
