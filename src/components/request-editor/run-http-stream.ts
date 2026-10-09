import type { SubmitType } from './submit-type';
import { submitHttpStream } from '@/domain/http-request';
import {
  appendHttpStreamEvent,
  beginHttpStream,
  endHttpStream,
  saveHttpStreamError,
} from '@/store/http-response';
import { $streamFormat } from './response-mode';
import { getStoredSubmitType } from './submit-type';

export async function runHttpStream(submitType: SubmitType = getStoredSubmitType()): Promise<void> {
  const streamFormat = $streamFormat.get();

  beginHttpStream(streamFormat);

  try {
    for await (const event of submitHttpStream(submitType, streamFormat)) {
      appendHttpStreamEvent(event);
    }
    endHttpStream();
  } catch (error) {
    saveHttpStreamError(error);
  }
}
