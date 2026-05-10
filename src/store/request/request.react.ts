import type { RequestEditorState } from './request.store';
import { useSyncExternalStore } from 'react';
import {
  $requestEditor,
  requestUrlValidationError,
  setRequestBody,
  setRequestEditorMethod,
  setRequestEditorUrl,
  setRequestHeaders,
  setRequestParams,
} from './request.store';

export function useRequestState(): RequestEditorState & {
  urlError: string | undefined;
  setMethod: typeof setRequestEditorMethod;
  setUrl: typeof setRequestEditorUrl;
  setHeaders: typeof setRequestHeaders;
  setParams: typeof setRequestParams;
  setBody: typeof setRequestBody;
} {
  const state = useSyncExternalStore(
    (onChange) => $requestEditor.subscribe(onChange),
    () => $requestEditor.get(),
    () => $requestEditor.get(),
  );

  return {
    ...state,
    urlError: requestUrlValidationError(state.url),
    setMethod: setRequestEditorMethod,
    setUrl: setRequestEditorUrl,
    setHeaders: setRequestHeaders,
    setParams: setRequestParams,
    setBody: setRequestBody,
  };
}
