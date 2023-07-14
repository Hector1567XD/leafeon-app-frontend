import { AuthStored, STORAGE_KEY } from "./types";

export const setStorageData = (data: AuthStored): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
