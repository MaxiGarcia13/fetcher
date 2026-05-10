import { decodeText, getUrlParam, removeUrlParam } from '@maxigarcia/js-utils';

export const REQUEST_URL_PARAM = 'url';
export const REQUEST_METHOD_PARAM = 'method';
export const REQUEST_HEADERS_PARAM = 'headers';
export const REQUEST_PARAMS_PARAM = 'params';
export const REQUEST_BODY_PARAM = 'body';

export function readUrlParam<T>(key: string, defaultValue?: T): T | undefined {
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

export function resetUrlParams() {
  removeUrlParam(REQUEST_URL_PARAM);
  removeUrlParam(REQUEST_METHOD_PARAM);
  removeUrlParam(REQUEST_HEADERS_PARAM);
  removeUrlParam(REQUEST_PARAMS_PARAM);
  removeUrlParam(REQUEST_BODY_PARAM);
}
