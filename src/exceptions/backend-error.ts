import { AxiosError } from "axios";
import { IBackendError, BackendErrorItem } from 'services/types';

const ILEGILITY_ERROR_MESSAGE = "Error ilegible del servidor";

export default class BackendError extends Error implements IBackendError {

  public message: string;
  public details?: BackendErrorItem[];

  constructor(error: unknown) {
    super();
    if (error instanceof AxiosError && error.response?.data?.message) {
      this.message = error.response.data.message;
      if (error.response.data.details) {
        this.details = error.response.data.details;
      }
    } else {
      this.message = ILEGILITY_ERROR_MESSAGE;
    }

    Object.setPrototypeOf(this, BackendError.prototype);
  }

  public getMessage(): string {
    return this.message;
  }
}
