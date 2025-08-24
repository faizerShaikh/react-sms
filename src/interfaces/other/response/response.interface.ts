export interface ResponseInterface<T = any> {
  rows: T;
  count: number;
}
