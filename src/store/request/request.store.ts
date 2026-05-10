import type { HttpMethod } from '../../domain/http-method';
import { isValidHttpUrl } from '@maxigarcia/js-utils';
import { map } from 'nanostores';

export interface RequestEditorState {
  method: HttpMethod;
  url: string;
}

export const $requestEditor = map<RequestEditorState>({
  method: 'GET',
  url: '',
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
