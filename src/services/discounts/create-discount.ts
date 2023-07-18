import axios from "axios";
// Own
import store from "store";
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import { Discount } from "core/discounts/types";

const URL = `${API_BASE_URL}/discounts`;

export default async function createDiscount(
  body: DiscountPayload
): Promise<Discount> {
  try {
    const response = await axios.post<Discount>(URL, body, {
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

export type DiscountPayload = Omit<Discount, "discountId" | "createdAt">;
