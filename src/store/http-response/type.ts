export interface HttpResponseCallResult {
  index: number;
  status: number | null;
  statusText: string;
  error: HttpResponseError | null;
}

export interface HttpResponseState {
  isLoading: boolean;
  status: number | null;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  error: HttpResponseError | null;
  callResults: HttpResponseCallResult[];
}

export type HttpResponseError = Record<string, unknown>;
