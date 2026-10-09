import type { StreamEvent } from '@/domain/http-request';
import { useEffect, useRef } from 'react';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { streamEventPreview } from '@/utils/stream-chat';

interface Props {
  events: readonly StreamEvent[];
}

export function StreamEventsList({ events }: Props) {
  const listRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={listRef}
      className="min-h-0 flex-1 overflow-auto font-mono text-xs"
      data-testid={HTTP_REQUEST_TEST_ID.STREAM_EVENTS}
    >
      {events.map((event, index) => {
        const key = `${event.kind}-${event.at}-${index}`;
        return (
          <div
            key={key}
            className="border-b border-app-border px-3 py-2"
          >
            <div className="mb-1 flex flex-wrap gap-2 text-app-text-muted">
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
            <pre className="break-all whitespace-pre-wrap text-app-text">{streamEventPreview(event)}</pre>
          </div>
        );
      })}
    </div>
  );
}
