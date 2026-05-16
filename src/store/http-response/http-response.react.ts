import type { HttpResponseState } from './type';
import { useSyncExternalStore } from 'react';
import { clearHttpResponse, saveHttpResponse } from './http-response.action';
import { $httpResponse } from './http-response.store';

export function useHttpResponseState(): HttpResponseState & {
  saveResponse: typeof saveHttpResponse;
  clearResponse: typeof clearHttpResponse;
} {
  const state = useSyncExternalStore(
    (onChange) => $httpResponse.subscribe(onChange),
    () => $httpResponse.get(),
    () => $httpResponse.get(),
  );

  return {
    ...state,
    saveResponse: saveHttpResponse,
    clearResponse: clearHttpResponse,
  };
}
