import type { HttpResponseCallResult, HttpResponseError } from './type';
import type { StreamEvent, StreamFormat } from '@/domain/http-request';
import { isAbortRequestError, tryParseJson } from '@maxigarcia/js-utils';
import {
  abortHttpStream as abortActiveHttpStream,
  streamEventToAssembledText,
} from '@/domain/http-request';
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
    callResults: [],
    mode: 'buffered',
    isStreaming: false,
    streamFormat: null,
    events: [],
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
    callResults: [],
    mode: 'buffered',
    isStreaming: false,
    streamFormat: null,
    events: [],
  });
}

export function beginHttpStream(format: StreamFormat): void {
  $httpResponse.set({
    ...initialHttpResponseState,
    mode: 'stream',
    isStreaming: true,
    isLoading: false,
    streamFormat: format,
    status: 200,
    statusText: 'OK',
  });
}

export function appendHttpStreamEvent(event: StreamEvent): void {
  const current = $httpResponse.get();

  $httpResponse.set({
    ...current,
    events: [...current.events, event],
    body: `${current.body}${streamEventToAssembledText(event)}`,
    error: null,
  });
}

export function endHttpStream(): void {
  $httpResponse.set({
    ...$httpResponse.get(),
    isStreaming: false,
    isLoading: false,
  });
}

export function saveHttpStreamError(error: unknown): void {
  if (isAbortRequestError(error)) {
    $httpResponse.set({
      ...$httpResponse.get(),
      isStreaming: false,
      isLoading: false,
      error: null,
    });
    return;
  }

  $httpResponse.set({
    ...$httpResponse.get(),
    isStreaming: false,
    isLoading: false,
    error: serializeHttpResponseError(error),
  });
}

export function abortHttpStreamResponse(): void {
  abortActiveHttpStream();
}

export async function saveHttpResponseBatch(
  results: PromiseSettledResult<Response>[],
): Promise<void> {
  const callResults: HttpResponseCallResult[] = results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return {
        index,
        status: result.value.status,
        statusText: result.value.statusText,
        error: null,
      };
    }

    return {
      index,
      status: null,
      statusText: '',
      error: serializeHttpResponseError(result.reason),
    };
  });

  const last = results.at(-1);

  if (last?.status === 'fulfilled') {
    await saveHttpResponse(last.value);
  } else if (last) {
    saveHttpResponseError(last.reason);
  }

  $httpResponse.setKey('callResults', callResults);
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
