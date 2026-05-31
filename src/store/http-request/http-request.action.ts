import type { KeyValueEntry } from '@/components/key-value-table/types';
import type { HttpMethod } from '@/domain/http-request';
import { encodeText, isValidHttpUrl } from '@maxigarcia/js-utils';
import { createKeyValueEmptyEntry } from '@/components/key-value-table/utils';
import { getHttpMethod } from '@/domain/http-request';
import {
  HTTP_REQUEST_BODY_PARAM,
  HTTP_REQUEST_HEADERS_PARAM,
  HTTP_REQUEST_METHOD_PARAM,
  HTTP_REQUEST_PARAMS_PARAM,
  HTTP_REQUEST_URL_PARAM,
} from '@/domain/http-request/url.consts';
import { removeUrlParam, setUrlParam } from '@/utils/url';
import { updateSavedSessionFromSearch } from '../saved-sessions';
import { $httpRequest } from './http-request.store';
import {
  readHttpRequestUrlParam,
  readInitialHttpRequestUrlAndParams,
  resetHttpRequestUrlParams,
} from './http-request.url';

export function httpRequestUrlValidationError(url: string): string | undefined {
  const trimmed = url.trim();
  if (trimmed === '') {
    return undefined;
  }
  return isValidHttpUrl(trimmed) ? undefined : 'Invalid URL';
}

export function setHttpRequestMethod(method: HttpMethod): void {
  $httpRequest.setKey('method', method);

  setUrlParam(HTTP_REQUEST_METHOD_PARAM, encodeText(method));

  updateSavedSessionFromSearch();
}

export function setHttpRequestUrl(url: string): void {
  $httpRequest.setKey('url', url);

  if (url && isValidHttpUrl(url)) {
    setUrlParam(HTTP_REQUEST_URL_PARAM, encodeText(url));
  } else {
    removeUrlParam(HTTP_REQUEST_URL_PARAM);
  }

  updateSavedSessionFromSearch();
}

export function setHttpRequestHeaders(headers: KeyValueEntry[]): void {
  $httpRequest.setKey('headers', headers);

  if (headers.length > 0) {
    setUrlParam(HTTP_REQUEST_HEADERS_PARAM, encodeText(JSON.stringify(headers)));
  } else {
    removeUrlParam(HTTP_REQUEST_HEADERS_PARAM);
  }

  updateSavedSessionFromSearch();
}

export function setHttpRequestParams(params: KeyValueEntry[]): void {
  $httpRequest.setKey('params', params);

  if (params.length > 0) {
    setUrlParam(HTTP_REQUEST_PARAMS_PARAM, encodeText(JSON.stringify(params)));
  } else {
    removeUrlParam(HTTP_REQUEST_PARAMS_PARAM);
  }

  updateSavedSessionFromSearch();
}

export function setHttpRequestBody(body: string): void {
  $httpRequest.setKey('body', body);

  if (body.trim()) {
    setUrlParam(HTTP_REQUEST_BODY_PARAM, encodeText(body));
  } else {
    removeUrlParam(HTTP_REQUEST_BODY_PARAM);
  }

  updateSavedSessionFromSearch();
}

export function applyHttpRequestFromSearch(search: string): void {
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
    const { url, params } = readInitialHttpRequestUrlAndParams();

    $httpRequest.set({
      method: getHttpMethod(methodRaw),
      url,
      headers: readHttpRequestUrlParam(HTTP_REQUEST_HEADERS_PARAM, [createKeyValueEmptyEntry()]) ?? [
        createKeyValueEmptyEntry(),
      ],
      params,
      body: readHttpRequestUrlParam(HTTP_REQUEST_BODY_PARAM, '{}') ?? '{}',
    });
  } catch {
    console.error('Invalid search params');
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
