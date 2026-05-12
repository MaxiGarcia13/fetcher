import { map } from 'nanostores';
import { tryParseJson } from '@/utils/value';

export type HttpResponseError = Record<string, unknown>;

export interface HttpResponseState {
  isLoading: boolean;
  status: number | null;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  error: HttpResponseError | null;
}

const initialHttpResponseState: HttpResponseState = {
  isLoading: false,
  status: null,
  statusText: '',
  headers: {},
  body: '',
  error: null,
};

export const $httpResponse = map<HttpResponseState>(initialHttpResponseState);

export async function saveHttpResponse(response: Response): Promise<void> {
  const body = await response.text();

  $httpResponse.set({
    ...$httpResponse.get(),
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    body: mapHttpResponseBody(body),
    error: null,
  });
}

export function saveHttpResponseError(error: unknown): void {
  $httpResponse.set({
    ...$httpResponse.get(),
    status: null,
    statusText: '',
    headers: {},
    body: '',
    error: serializeHttpResponseError(error),
  });
}

export function setHttpResponseLoading(isLoading: boolean): void {
  $httpResponse.setKey('isLoading', isLoading);
}

export function clearHttpResponse(): void {
  $httpResponse.set(initialHttpResponseState);
}

function serializeHttpResponseError(error: unknown): HttpResponseError {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      ...(error.stack ? { stack: error.stack } : {}),
    };
  }

  if (typeof error === 'object' && error !== null) {
    return { ...(error as HttpResponseError) };
  }

  return { message: String(error) };
}

function mapHttpResponseBody(body: string): string {
  const trimmed = body.trim();
  const parsed = tryParseJson(trimmed);

  if (parsed === undefined || typeof parsed !== 'object' || parsed === null) {
    return body;
  }

  return JSON.stringify(parsed, null, 2);
}
