export interface IBackendError {
  message: string;
  details?: BackendErrorItem[];
}

export interface BackendErrorItem {
  field: string;
  message: string;
}

export interface PaginateData {
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  paginate: PaginateData;
  items: T[];
}

export type PaginateBody = {
  page?: number;
  size?: number;
}
