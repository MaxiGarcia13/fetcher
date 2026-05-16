import type { HttpResponseError } from './type';
import { tryParseJson } from '@/utils/value';
import { $httpResponse, initialHttpResponseState } from './http-response.store';

export async function saveHttpResponse(response: Response): Promise<void> {
  const contentTypeHeader = response.headers.get('content-type') ?? '';
  const mime = contentTypeHeader.split(';')[0]?.trim().toLowerCase() ?? '';
  const body = mime.startsWith('image/')
    ? await blobToDataUrl(await response.blob())
    : mapHttpResponseBody(await response.text());

  $httpResponse.set({
    ...$httpResponse.get(),
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    body,
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
    };
  }

  if (typeof error === 'object' && error !== null) {
    return { ...(error as HttpResponseError) };
  }

  return { message: String(error) };
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
        return;
      }
      reject(new Error('Failed to read image response as data URL'));
    };
    reader.onerror = () => reject(reader.error ?? new Error('FileReader error'));
    reader.readAsDataURL(blob);
  });
}

function mapHttpResponseBody(body: string): string {
  const trimmed = body.trim();
  const parsed = tryParseJson(trimmed);

  if (parsed === undefined || typeof parsed !== 'object' || parsed === null) {
    return body;
  }

  return JSON.stringify(parsed, null, 2);
}
