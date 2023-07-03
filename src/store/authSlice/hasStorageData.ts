import { STORAGE_KEY } from "./types";

export const hasStorageData = (): boolean => {
  const storedData = localStorage.getItem(STORAGE_KEY) || null;
  return !!storedData;
};
