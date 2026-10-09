import type { StreamEvent } from '@/domain/http-request';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@/components/icons/chevron-down';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { formatFullEvent, streamEventPreview } from '@/utils/stream-chat';

interface Props {
  events: readonly StreamEvent[];
}

export function StreamEventsList({ events }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const [expandedIndexes, setExpandedIndexes] = useState<ReadonlySet<number>>(
    () => new Set(),
  );

  useEffect(() => {
    const node = listRef.current;
    if (!node) {
      return;
    }
    node.scrollTop = node.scrollHeight;
  }, [events.length]);

  if (events.length === 0) {
    return (
      <p className="p-4 text-sm text-app-text-muted">
        Waiting for stream events…
      </p>
    );
  }

  const toggleExpanded = (index: number) => {
    setExpandedIndexes((previous) => {
      const next = new Set(previous);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div
      ref={listRef}
      className="min-h-0 flex-1 overflow-auto font-mono text-xs"
      data-testid={HTTP_REQUEST_TEST_ID.STREAM_EVENTS}
    >
      {events.map((event, index) => {
        const key = `${event.kind}-${event.at}-${index}`;
        const isExpanded = expandedIndexes.has(index);

        return (
          <button
            key={key}
            type="button"
            className="block w-full cursor-pointer border-b border-app-border px-3 py-2 text-left hover:bg-app-bg-hover"
            aria-expanded={isExpanded}
            onClick={() => {
              toggleExpanded(index);
            }}
          >
            <div className="mb-1 flex flex-wrap items-center gap-2 text-app-text-muted">
              <ChevronDownIcon
                className={cn(
                  'size-3.5 shrink-0 transition-transform',
                  isExpanded ? 'rotate-0' : '-rotate-90',
                )}
              />
              <span>
                #
                {index + 1}
              </span>
              <span>
                {event.at}
                ms
              </span>
              <span className="uppercase">{event.kind}</span>
              {event.kind === 'sse' && event.event && (
                <span>
                  event:
                  {event.event}
                </span>
              )}
            </div>
            <pre className="break-all whitespace-pre-wrap text-app-text">
              {isExpanded ? formatFullEvent(event) : streamEventPreview(event)}
            </pre>
          </button>
        );
      })}
    </div>
  );
}
