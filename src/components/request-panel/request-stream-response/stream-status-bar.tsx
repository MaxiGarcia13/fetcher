import type { StreamStatus } from '@/store/http-response';
import { cn } from '@maxigarcia/js-utils';
import { Button } from '@/components/button';
import { StopIcon } from '@/components/icons/stop';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { abortHttpStreamResponse } from '@/store/http-response';
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
}

export function StreamStatusBar({
  streamStatus,
  eventCount,
  elapsedMs,
  isStreaming,
}: Props) {
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
      {isStreaming && (
        <Button
          type="button"
          size="sm"
          variant="default"
          className="ml-auto"
          aria-label="Stop streaming request"
          data-testid={HTTP_REQUEST_TEST_ID.STREAM_TOOLBAR_STOP}
          onClick={() => {
            abortHttpStreamResponse();
          }}
        >
          <StopIcon className="size-3.5" />
          Stop
        </Button>
      )}
    </div>
  );
}
