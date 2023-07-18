import axios from "axios";
// Own
import store from "store";
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import { SupplyLine } from "core/supply-lines/types";

const URL = `${API_BASE_URL}/supply-lines`;

export default async function createSupplyLine(
  body: SupplyLinePayload
): Promise<SupplyLine> {
  try {
    const response = await axios.post<SupplyLine>(URL, body, {
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

export type SupplyLinePayload = Omit<SupplyLine, "supplyLineId" | "createdAt">;
