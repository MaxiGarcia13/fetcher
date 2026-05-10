import type { KeyValueEntry } from '@/components/key-value-table/types';
import type { HttpMethod } from '@/domain/http-method';
import { isValidHttpUrl } from '@maxigarcia/js-utils';
import { map } from 'nanostores';
import { createKeyValueEmptyEntry } from '@/components/key-value-table/utils';

export interface RequestEditorState {
  method: HttpMethod;
  url: string;
  headers: KeyValueEntry[];
  params: KeyValueEntry[];
  body: string;
}

export const $requestEditor = map<RequestEditorState>({
  method: 'GET',
  url: '',
  headers: [createKeyValueEmptyEntry()],
  params: [createKeyValueEmptyEntry()],
  body: '{}',
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
}

export function setRequestEditorUrl(url: string): void {
  $requestEditor.setKey('url', url);
}

export function setRequestHeaders(headers: KeyValueEntry[]): void {
  $requestEditor.setKey('headers', headers);
}

export function setRequestParams(params: KeyValueEntry[]): void {
  $requestEditor.setKey('params', params);
}

export function setRequestBody(body: string): void {
  $requestEditor.setKey('body', body);
}
