import axios from "axios";
// Own
import store from "store";
import { Bill } from "core/bills/types";
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";

const URL = `${API_BASE_URL}/bills`;

export default async function createBill(body: BillPayload): Promise<Bill> {
  try {
    const response = await axios.post<Bill>(URL, body, {
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

export type BillPayload = Omit<
  Bill,
  "billId" | "discountValue" | "totalCost" | "createdAt"
>;
