export interface HttpResponseState {
  isLoading: boolean;
  status: number | null;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  error: HttpResponseError | null;
}

export type HttpResponseError = Record<string, unknown>;
