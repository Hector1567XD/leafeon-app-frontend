export interface IBackendError {
  message: string;
  details?: BackendErrorItem[];
}

export interface BackendErrorItem {
  field: string;
  message: string;
}
