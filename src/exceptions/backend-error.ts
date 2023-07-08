import { AxiosError } from "axios";
import { IBackendError, BackendErrorItem } from 'services/types';

const ILEGILITY_ERROR_MESSAGE = "Error ilegible del servidor";

export default class BackendError extends Error implements IBackendError {
  public message: string = 'Error desconocido';
  public details?: BackendErrorItem[];

  constructor(error: unknown) {
    super();
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        this.message = error.response.data.message;
        if (error.response.data.details) {
          this.details = error.response.data.details;
        }

        if (error.response.data.message === "Error de Token") {
          console.log('Error de token');
          window.location.href = window.location.origin + '/logout';
        }
      } else {
        if (error.message === 'Network Error') {
          this.message = 'Error de conexión perdida';
        } else if (error.code === 'ECONNABORTED') {
          this.message = 'Timeout de la conexión';
        } else if (error.code === "ERR_BAD_REQUEST") {
          this.message = 'Error al establecer conexion con el servidor';
        }
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
