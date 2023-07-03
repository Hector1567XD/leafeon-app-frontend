import { STORAGE_KEY } from "./types";

export const clearStorageData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
