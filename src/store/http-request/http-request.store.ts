import type { KeyValueEntry } from '@/components/key-value-table/types';
import type { HttpMethod } from '@/domain/http-request';
import { encodeText, isValidHttpUrl, removeUrlParam, setUrlParams } from '@maxigarcia/js-utils';
import { map } from 'nanostores';
import { createKeyValueEmptyEntry } from '@/components/key-value-table/utils';
import { getHttpMethod } from '@/domain/http-request';
import {

  HTTP_REQUEST_BODY_PARAM,
  HTTP_REQUEST_HEADERS_PARAM,
  HTTP_REQUEST_METHOD_PARAM,
  HTTP_REQUEST_PARAMS_PARAM,
  HTTP_REQUEST_URL_PARAM,
} from '@/domain/http-request/url.consts';
import { updateSavedSessionFromSearch } from '../saved-sessions';
import {
  readHttpRequestUrlParam,
  resetHttpRequestUrlParams,
} from './http-request.url';

export interface HttpRequestState {
  method: HttpMethod;
  url: string;
  headers: KeyValueEntry[];
  params: KeyValueEntry[];
  body: string;
}

export const $httpRequest = map<HttpRequestState>({
  method: getHttpMethod(readHttpRequestUrlParam(HTTP_REQUEST_METHOD_PARAM)),
  url: readHttpRequestUrlParam(HTTP_REQUEST_URL_PARAM, ''),
  headers: readHttpRequestUrlParam(HTTP_REQUEST_HEADERS_PARAM, [createKeyValueEmptyEntry()]),
  params: readHttpRequestUrlParam(HTTP_REQUEST_PARAMS_PARAM, [createKeyValueEmptyEntry()]),
  body: readHttpRequestUrlParam(HTTP_REQUEST_BODY_PARAM, '{}'),
});

export function httpRequestUrlValidationError(url: string): string | undefined {
  const trimmed = url.trim();
  if (trimmed === '') {
    return undefined;
  }
  return isValidHttpUrl(trimmed) ? undefined : 'Invalid URL';
}

export function setHttpRequestMethod(method: HttpMethod): void {
  $httpRequest.setKey('method', method);

  setUrlParams({ [HTTP_REQUEST_METHOD_PARAM]: encodeURIComponent(encodeText(method)) });

  updateSavedSessionFromSearch();
}

export function setHttpRequestUrl(url: string): void {
  $httpRequest.setKey('url', url);

  if (url && isValidHttpUrl(url)) {
    setUrlParams({ [HTTP_REQUEST_URL_PARAM]: encodeURIComponent(encodeText(url)) });
  } else {
    removeUrlParam(HTTP_REQUEST_URL_PARAM);
  }

  updateSavedSessionFromSearch();
}

export function setHttpRequestHeaders(headers: KeyValueEntry[]): void {
  $httpRequest.setKey('headers', headers);

  if (headers.length > 0) {
    setUrlParams({ [HTTP_REQUEST_HEADERS_PARAM]: encodeURIComponent(encodeText(JSON.stringify(headers))) });
  } else {
    removeUrlParam(HTTP_REQUEST_HEADERS_PARAM);
  }

  updateSavedSessionFromSearch();
}

export function setHttpRequestParams(params: KeyValueEntry[]): void {
  $httpRequest.setKey('params', params);

  if (params.length > 0) {
    setUrlParams({ [HTTP_REQUEST_PARAMS_PARAM]: encodeURIComponent(encodeText(JSON.stringify(params))) });
  } else {
    removeUrlParam(HTTP_REQUEST_PARAMS_PARAM);
  }

  updateSavedSessionFromSearch();
}

export function setHttpRequestBody(body: string): void {
  $httpRequest.setKey('body', body);

  if (body.trim()) {
    setUrlParams({ [HTTP_REQUEST_BODY_PARAM]: encodeURIComponent(encodeText(body)) });
  } else {
    removeUrlParam(HTTP_REQUEST_BODY_PARAM);
  }

  updateSavedSessionFromSearch();
}

export function applyHttpRequestFromSearch(search: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const next = new URL(window.location.href);
    const normalized = search.startsWith('?')
      ? search
      : search.length > 0
        ? `?${search}`
        : '';
    next.search = normalized;
    window.history.replaceState({}, '', next.toString());

    const methodRaw = readHttpRequestUrlParam(HTTP_REQUEST_METHOD_PARAM, 'GET');
    $httpRequest.set({
      method: getHttpMethod(methodRaw),
      url: readHttpRequestUrlParam(HTTP_REQUEST_URL_PARAM, '') ?? '',
      headers: readHttpRequestUrlParam(HTTP_REQUEST_HEADERS_PARAM, [createKeyValueEmptyEntry()]) ?? [
        createKeyValueEmptyEntry(),
      ],
      params: readHttpRequestUrlParam(HTTP_REQUEST_PARAMS_PARAM, [createKeyValueEmptyEntry()]) ?? [
        createKeyValueEmptyEntry(),
      ],
      body: readHttpRequestUrlParam(HTTP_REQUEST_BODY_PARAM, '{}') ?? '{}',
    });
  } catch {
    /* ignore: malformed snapshot query (e.g. invalid JSON in encoded params) */
  }
}

export function resetHttpRequestState() {
  $httpRequest.set({
    method: 'GET',
    url: '',
    headers: [createKeyValueEmptyEntry()],
    params: [createKeyValueEmptyEntry()],
    body: '{}',
  });

  resetHttpRequestUrlParams();
}
