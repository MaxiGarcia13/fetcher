import type { StreamStatus } from '@/store/http-response';
import { cn } from '@maxigarcia/js-utils';
import { Button } from '@/components/button';
import { PasteIcon } from '@/components/icons/paste';
import { StopIcon } from '@/components/icons/stop';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { setHttpRequestBody } from '@/store/http-request';
import { abortHttpStreamResponse } from '@/store/http-response';
import { appendAssistantToRequestBody } from '@/utils/stream-chat';
import { formatElapsed } from './format-elapsed';

const STREAM_STATUS_LABEL: Record<StreamStatus, string> = {
  idle: 'Idle',
  streaming: 'Live',
  completed: 'Done',
  aborted: 'Aborted',
  error: 'Error',
};

interface Props {
  streamStatus: StreamStatus;
  eventCount: number;
  elapsedMs: number;
  isStreaming: boolean;
  requestBody: string;
  assistantText: string;
}

export function StreamStatusBar({
  streamStatus,
  eventCount,
  elapsedMs,
  isStreaming,
  requestBody,
  assistantText,
}: Props) {
  const nextBody = !isStreaming && assistantText.trim()
    ? appendAssistantToRequestBody(requestBody, assistantText)
    : null;
  const canAppendToBody = nextBody !== null;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-app-border px-3 py-2 text-xs">
      <span
        className={cn(
          'rounded px-2 py-0.5 font-medium',
          streamStatus === 'streaming' && 'bg-green-700/30 text-green-300',
          streamStatus === 'completed' && 'bg-blue-700/30 text-blue-300',
          streamStatus === 'aborted' && 'bg-amber-700/30 text-amber-300',
          streamStatus === 'error' && 'bg-red-700/30 text-red-300',
          streamStatus === 'idle' && 'bg-app-bg-base text-app-text-muted',
        )}
        data-testid={HTTP_REQUEST_TEST_ID.STREAM_STATUS}
      >
        {STREAM_STATUS_LABEL[streamStatus]}
      </span>
      <span className="text-app-text-muted" data-testid={HTTP_REQUEST_TEST_ID.STREAM_EVENT_COUNT}>
        {eventCount}
        {' '}
        event
        {eventCount === 1 ? '' : 's'}
      </span>
      <span className="text-app-text-muted">{formatElapsed(elapsedMs)}</span>
      <div className="ml-auto flex items-center gap-1">
        {isStreaming
          ? (
              <Button
                type="button"
                size="sm"
                variant="default"
                aria-label="Stop streaming request"
                data-testid={HTTP_REQUEST_TEST_ID.STREAM_TOOLBAR_STOP}
                onClick={() => {
                  abortHttpStreamResponse();
                }}
              >
                <StopIcon className="size-3.5" />
                Stop
              </Button>
            )
          : canAppendToBody && (
            <Button
              type="button"
              size="sm"
              variant="default"
              aria-label="Append assistant reply to request body"
              data-testid={HTTP_REQUEST_TEST_ID.STREAM_APPEND_BODY_BUTTON}
              onClick={() => {
                if (nextBody) {
                  setHttpRequestBody(nextBody);
                }
              }}
            >
              <PasteIcon className="size-3.5" />
              Append to body
            </Button>
          )}
      </div>
    </div>
  );
}
