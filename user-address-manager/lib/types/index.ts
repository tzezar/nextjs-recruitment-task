export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type FormState = {
  message: string,
  fields?: Record<string,string>,
  issues?: string[],
}