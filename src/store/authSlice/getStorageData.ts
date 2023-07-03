import { AuthStored, STORAGE_KEY } from "./types";

export const getStorageData = (): AuthStored => {
  const storedData = localStorage.getItem(STORAGE_KEY) || null;

  if (storedData) {
    try {
      return JSON.parse(storedData) as AuthStored;
    } catch (error) {
      console.error('Error parsing storage data:', error);
      throw error;
    }
  }

  console.error('No auth');
  throw new Error('No auth');
};
