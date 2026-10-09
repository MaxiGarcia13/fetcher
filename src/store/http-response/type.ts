import type { StreamEvent, StreamFormat } from '@/domain/http-request';

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
  mode: 'buffered' | 'stream';
  isStreaming: boolean;
  streamFormat: StreamFormat | null;
  events: StreamEvent[];
}

export type HttpResponseError = Record<string, unknown>;
