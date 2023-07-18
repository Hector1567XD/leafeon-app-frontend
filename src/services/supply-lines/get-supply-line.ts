import axios from "axios";
// Own
import BackendError from "exceptions/backend-error";
import { API_BASE_URL } from "config/constants";
import { SupplyLine } from "core/supply-lines/types";
import store from "store";

const URL = `${API_BASE_URL}/supply-lines`;

export default async function getSupplyLine(
  supplyLineId: number
): Promise<SupplyLine> {
  try {
    const response = await axios.get<SupplyLine>(`${URL}/${supplyLineId}`, {
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
