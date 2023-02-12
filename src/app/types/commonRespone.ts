export interface TcommonResponse<T> {
  currentPage: number;
  data: T;
  total: number;
  totalPage: number;
}
