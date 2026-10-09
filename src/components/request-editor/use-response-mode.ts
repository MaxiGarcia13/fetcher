import { useSyncExternalStore } from 'react';
import {
  $responseSendMode,
  $streamFormat,
  setResponseSendMode,
  setStreamFormat,
} from './response-mode';

export function useResponseSendMode() {
  const mode = useSyncExternalStore(
    (onChange) => $responseSendMode.subscribe(onChange),
    () => $responseSendMode.get(),
    () => $responseSendMode.get(),
  );

  const streamFormat = useSyncExternalStore(
    (onChange) => $streamFormat.subscribe(onChange),
    () => $streamFormat.get(),
    () => $streamFormat.get(),
  );

  return {
    mode,
    streamFormat,
    setMode: setResponseSendMode,
    setStreamFormat,
  };
}
