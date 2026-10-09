import type { ResponseSendMode } from './response-mode';
import type { StreamFormat } from '@/domain/http-request';
import { cn } from '@maxigarcia/js-utils';
import { Select } from '@/components/select';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { useHttpResponseState } from '@/store/http-response';
import { useResponseSendMode } from './use-response-mode';

const RESPONSE_MODE_OPTIONS = [
  { label: 'Buffered', value: 'buffered' },
  { label: 'Stream', value: 'stream' },
] as const satisfies ReadonlyArray<{ label: string; value: ResponseSendMode }>;

const STREAM_FORMAT_OPTIONS = [
  { label: 'SSE', value: 'sse' },
  { label: 'NDJSON', value: 'ndjson' },
  { label: 'Bytes', value: 'bytes' },
] as const satisfies ReadonlyArray<{ label: string; value: StreamFormat }>;

interface Props {
  className?: string;
}

export function ResponseModeControls({ className }: Props) {
  const { mode, streamFormat, setMode, setStreamFormat } = useResponseSendMode();
  const { isLoading, isStreaming } = useHttpResponseState();
  const disabled = isLoading || isStreaming;
  const showFormat = mode === 'stream';

  return (
    <div className={cn('flex shrink-0 items-center', className)}>
      <Select
        aria-label="Response mode"
        value={mode}
        disabled={disabled}
        options={[...RESPONSE_MODE_OPTIONS]}
        onChange={(value) => {
          if (value === 'buffered' || value === 'stream') {
            setMode(value);
          }
        }}
        className={cn(
          'w-auto max-w-30 rounded-l-none border-l-0 pr-7 pl-2 text-xs sm:max-w-none sm:min-w-28 sm:pr-9 sm:pl-3 sm:text-sm',
          showFormat && 'rounded-r-none',
        )}
        data-testid={HTTP_REQUEST_TEST_ID.RESPONSE_MODE_SELECT}
      />
      {showFormat && (
        <Select
          aria-label="Stream format"
          value={streamFormat}
          disabled={disabled}
          options={[...STREAM_FORMAT_OPTIONS]}
          onChange={(value) => {
            if (value === 'sse' || value === 'ndjson' || value === 'bytes') {
              setStreamFormat(value);
            }
          }}
          className="w-auto max-w-22 rounded-l-none border-l-0 pr-7 pl-2 text-xs sm:max-w-none sm:min-w-24 sm:pr-9 sm:pl-3 sm:text-sm"
          data-testid={HTTP_REQUEST_TEST_ID.STREAM_FORMAT_SELECT}
        />
      )}
    </div>
  );
}
