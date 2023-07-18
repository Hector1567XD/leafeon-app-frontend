import axios from "axios";
// Own
import BackendError from "exceptions/backend-error";
import { API_BASE_URL } from "config/constants";
import { SupplyLine } from "core/supply-lines/types";
import store from "store";

const URL = `${API_BASE_URL}/supply-lines`;

export default async function editSupplyLine(
  supplyLineId: number,
  body: SupplyLinePayload
): Promise<SupplyLine> {
  try {
    const response = await axios.put<SupplyLine>(
      `${URL}/${supplyLineId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

export type SupplyLinePayload = Omit<SupplyLine, "supplyLineId" | "createdAt">;
