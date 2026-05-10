import type { RequestEditorState } from './request.store';
import { useSyncExternalStore } from 'react';
import {
  $requestEditor,
  requestUrlValidationError,
  setRequestEditorMethod,
  setRequestEditorUrl,
} from './request.store';

export function useRequestState(): RequestEditorState & {
  urlError: string | undefined;
  setMethod: typeof setRequestEditorMethod;
  setUrl: typeof setRequestEditorUrl;
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
  };
}
