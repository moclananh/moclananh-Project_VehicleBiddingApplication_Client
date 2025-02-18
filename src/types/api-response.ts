export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  isSuccess: boolean;
}
export interface WithMetaData<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  itemCounts: number;
}
