export interface ErrorResponse {
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Record<string, Array<string>>;
}
