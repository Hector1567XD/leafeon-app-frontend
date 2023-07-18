import axios from "axios";
// Own
import BackendError from "exceptions/backend-error";
import { API_BASE_URL } from "config/constants";
import { Bill } from "core/bills/types";
import store from "store";

const URL = `${API_BASE_URL}/bills`;

export default async function editBill(
  billId: number,
  body: BillPayload
): Promise<Bill> {
  try {
    const response = await axios.put<Bill>(`${URL}/${billId}`, body, {
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
