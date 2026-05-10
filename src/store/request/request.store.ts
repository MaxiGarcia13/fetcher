import type { KeyValueEntry } from '@/components/key-value-table/types';
import type { HttpMethod } from '@/domain/http-method';
import { encodeText, isValidHttpUrl, removeUrlParam, setUrlParams } from '@maxigarcia/js-utils';
import { map } from 'nanostores';
import { createKeyValueEmptyEntry } from '@/components/key-value-table/utils';
import { readParm, REQUEST_BODY_PARAM, REQUEST_HEADERS_PARAM, REQUEST_METHOD_PARAM, REQUEST_PARAMS_PARAM, REQUEST_URL_PARAM } from './url';

export interface RequestEditorState {
  method: HttpMethod;
  url: string;
  headers: KeyValueEntry[];
  params: KeyValueEntry[];
  body: string;
}

export const $requestEditor = map<RequestEditorState>({
  method: readParm(REQUEST_METHOD_PARAM, 'GET'),
  url: readParm(REQUEST_URL_PARAM, ''),
  headers: readParm(REQUEST_HEADERS_PARAM, [createKeyValueEmptyEntry()]),
  params: readParm(REQUEST_PARAMS_PARAM, [createKeyValueEmptyEntry()]),
  body: readParm(REQUEST_BODY_PARAM, '{}'),
});

export function requestUrlValidationError(url: string): string | undefined {
  const trimmed = url.trim();
  if (trimmed === '') {
    return undefined;
  }
  return isValidHttpUrl(trimmed) ? undefined : 'Invalid URL';
}

export function setRequestEditorMethod(method: HttpMethod): void {
  $requestEditor.setKey('method', method);

  setUrlParams({ [REQUEST_METHOD_PARAM]: encodeText(method) });
}

export function setRequestEditorUrl(url: string): void {
  $requestEditor.setKey('url', url);

  if (url && isValidHttpUrl(url)) {
    setUrlParams({ [REQUEST_URL_PARAM]: encodeText(url) });
  } else {
    removeUrlParam(REQUEST_URL_PARAM);
  }
}

export function setRequestHeaders(headers: KeyValueEntry[]): void {
  $requestEditor.setKey('headers', headers);

  if (headers.length > 0) {
    setUrlParams({ [REQUEST_HEADERS_PARAM]: encodeText(JSON.stringify(headers)) });
  } else {
    removeUrlParam(REQUEST_HEADERS_PARAM);
  }
}

export function setRequestParams(params: KeyValueEntry[]): void {
  $requestEditor.setKey('params', params);

  if (params.length > 0) {
    setUrlParams({ [REQUEST_PARAMS_PARAM]: encodeText(JSON.stringify(params)) });
  } else {
    removeUrlParam(REQUEST_PARAMS_PARAM);
  }
}

export function setRequestBody(body: string): void {
  $requestEditor.setKey('body', body);

  if (body.trim()) {
    setUrlParams({ [REQUEST_BODY_PARAM]: encodeText(body) });
  } else {
    removeUrlParam(REQUEST_BODY_PARAM);
  }
}
