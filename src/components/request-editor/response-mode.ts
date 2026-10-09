import type { StreamFormat } from '@/domain/http-request';
import { createStorage } from '@maxigarcia/js-utils';
import { atom } from 'nanostores';

export type ResponseSendMode = 'buffered' | 'stream';

const responseSendModeStorage = createStorage<ResponseSendMode>('response-send-mode');
const streamFormatStorage = createStorage<StreamFormat>('response-stream-format');

function readStoredResponseSendMode(): ResponseSendMode {
  return responseSendModeStorage.getItem() === 'stream' ? 'stream' : 'buffered';
}

function readStoredStreamFormat(): StreamFormat {
  const stored = streamFormatStorage.getItem();

  if (stored === 'sse' || stored === 'ndjson' || stored === 'bytes') {
    return stored;
  }

  return 'sse';
}

export const $responseSendMode = atom<ResponseSendMode>(readStoredResponseSendMode());
export const $streamFormat = atom<StreamFormat>(readStoredStreamFormat());

export function setResponseSendMode(mode: ResponseSendMode): void {
  responseSendModeStorage.setItem(mode);
  $responseSendMode.set(mode);
}

export function setStreamFormat(format: StreamFormat): void {
  streamFormatStorage.setItem(format);
  $streamFormat.set(format);
}
