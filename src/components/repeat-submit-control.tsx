import type { ComponentProps } from 'react';
import { cn, isValidHttpUrl } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { submitHttpRequestTimes } from '@/domain/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { saveHttpResponseBatch, setHttpResponseLoading, useHttpResponseState } from '@/store/http-response';
import { Button } from './button';
import { ArrowIterationIcon } from './icons/arrow-iteration';
import { getStoredSubmitType } from './request-editor/submit-type';
import { Tooltip } from './tooltip';

const MIN_TIMES = 1;
const MAX_TIMES = 100;
const DEFAULT_TIMES = 10;

type RepeatSubmitControlProps = ComponentProps<typeof Button>;

export function RepeatSubmitControl({ className, size }: RepeatSubmitControlProps) {
  const { url } = useHttpRequestState();
  const { isLoading } = useHttpResponseState();
  const [times, setTimes] = useState(DEFAULT_TIMES);

  const isValidCount = Number.isInteger(times) && times >= MIN_TIMES && times <= MAX_TIMES;

  const handleClick = () => {
    if (!isValidCount) {
      return;
    }

    setHttpResponseLoading(true);

    submitHttpRequestTimes(times, getStoredSubmitType())
      .then((results) => saveHttpResponseBatch(results))
      .finally(() => setHttpResponseLoading(false));
  };

  return (
    <div className={cn('flex shrink-0 items-center gap-1', className)}>
      <input
        type="number"
        min={MIN_TIMES}
        max={MAX_TIMES}
        value={times}
        onChange={(event) => {
          setTimes(Number(event.target.value));
        }}
        aria-label="Number of times to send the request"
        className="h-8 w-10 shrink-0 [appearance:textfield] rounded border border-gray-600 bg-transparent px-1 text-center text-xs text-app-text [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Tooltip
        content="Send this request multiple times in parallel to test rate limits"
        placement="bottom"
        className="shrink-0"
      >
        <Button
          type="button"
          aria-label="Send request multiple times"
          onClick={handleClick}
          disabled={!isValidHttpUrl(url) || !isValidCount || isLoading}
          size={size}
        >
          <ArrowIterationIcon className="size-4" />
        </Button>
      </Tooltip>
    </div>
  );
}
