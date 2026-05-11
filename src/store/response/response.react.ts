import type { HttpResponseState } from './response.store';
import { useSyncExternalStore } from 'react';
import { $httpResponse, clearHttpResponse, saveHttpResponse } from './response.store';

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
