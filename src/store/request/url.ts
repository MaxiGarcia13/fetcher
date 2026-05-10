import { decodeText, getUrlParam } from '@maxigarcia/js-utils';

export const REQUEST_URL_PARAM = 'url';
export const REQUEST_METHOD_PARAM = 'method';
export const REQUEST_HEADERS_PARAM = 'headers';
export const REQUEST_PARAMS_PARAM = 'params';
export const REQUEST_BODY_PARAM = 'body';

export function readParm<T>(key: string, defaultValue: T): T | undefined {
  const param = getUrlParam(key);

  if (param) {
    const decoded = decodeText(param);

    const paramsToParse = [REQUEST_HEADERS_PARAM, REQUEST_PARAMS_PARAM];

    if (paramsToParse.includes(key)) {
      return JSON.parse(decoded) as T;
    }

    return decoded as T;
  }

  return defaultValue;
}
