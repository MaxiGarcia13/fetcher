import type { HttpRequestState } from './type';
import { useSyncExternalStore } from 'react';
import {
  httpRequestUrlValidationError,
  setHttpRequestBody,
  setHttpRequestHeaders,
  setHttpRequestMethod,
  setHttpRequestParams,
  setHttpRequestUrl,
} from './http-request.action';
import { $httpRequest } from './http-request.store';

export function useHttpRequestState(): HttpRequestState & {
  urlError: string | undefined;
  setMethod: typeof setHttpRequestMethod;
  setUrl: typeof setHttpRequestUrl;
  setHeaders: typeof setHttpRequestHeaders;
  setParams: typeof setHttpRequestParams;
  setBody: typeof setHttpRequestBody;
} {
  const state = useSyncExternalStore(
    (onChange) => $httpRequest.subscribe(onChange),
    () => $httpRequest.get(),
    () => $httpRequest.get(),
  );

  return {
    ...state,
    urlError: httpRequestUrlValidationError(state.url),
    setMethod: setHttpRequestMethod,
    setUrl: setHttpRequestUrl,
    setHeaders: setHttpRequestHeaders,
    setParams: setHttpRequestParams,
    setBody: setHttpRequestBody,
  };
}
