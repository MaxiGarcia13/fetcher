import type { TabItem } from '@/components/tabs/types';
import type { StreamEvent } from '@/domain/http-request';
import type { StreamStatus } from '@/store/http-response';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/button';
import { LazyEditor } from '@/components/editor/lazy-editor';
import { StopIcon } from '@/components/icons/stop';
import { TabsContent } from '@/components/tabs/tabs-content';
import { TabsHeader } from '@/components/tabs/tabs-header';
import { TabsRoot } from '@/components/tabs/tabs-root';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { abortHttpStreamResponse, useHttpResponseState } from '@/store/http-response';
import {
  assembleChatFromEvents,
  streamEventPreview,
  streamEventToRawText,
} from '@/utils/stream-chat';

type StreamTab = 'events' | 'assembled' | 'raw' | 'chat';

interface Props {
  className?: string;
}

const STREAM_STATUS_LABEL: Record<StreamStatus, string> = {
  idle: 'Idle',
  streaming: 'Live',
  completed: 'Done',
  aborted: 'Aborted',
  error: 'Error',
};

export function RequestStreamResponse({ className }: Props) {
  const { body, error, events, isStreaming, streamStatus } = useHttpResponseState();
  const { body: requestBody } = useHttpRequestState();
  const [activeTab, setActiveTab] = useState<StreamTab>('events');

  const rawText = useMemo(
    () => events.map((event) => streamEventToRawText(event)).join(''),
    [events],
  );
  const chatText = useMemo(() => assembleChatFromEvents(events), [events]);
  const elapsedMs = events.at(-1)?.at ?? 0;

  const items: TabItem<StreamTab>[] = [
    {
      value: 'events',
      label: 'Events',
      content: <StreamEventsList events={events} />,
    },
    {
      value: 'assembled',
      label: 'Assembled',
      content: (
        <LazyEditor
          className="min-h-0 flex-1"
          value={body}
          language="markdown"
          data-testid={HTTP_REQUEST_TEST_ID.STREAM_ASSEMBLED}
          readOnly
        />
      ),
    },
    {
      value: 'raw',
      label: 'Raw',
      content: (
        <LazyEditor
          className="min-h-0 flex-1"
          value={rawText}
          language="markdown"
          data-testid={HTTP_REQUEST_TEST_ID.STREAM_RAW}
          readOnly
        />
      ),
    },
    {
      value: 'chat',
      label: 'Chat',
      content: (
        <StreamChatView
          requestBody={requestBody}
          assistantText={chatText}
          isStreaming={isStreaming}
        />
      ),
    },
  ];

  return (
    <div
      className={cn('flex min-h-0 flex-1 flex-col bg-app-bg-surface', className)}
      data-testid={HTTP_REQUEST_TEST_ID.STREAM_RESPONSE}
    >
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
          {events.length}
          {' '}
          event
          {events.length === 1 ? '' : 's'}
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

      {error && (
        <div className="border-b border-app-border px-3 py-2 text-xs text-red-300">
          {typeof error.message === 'string' ? error.message : JSON.stringify(error)}
        </div>
      )}

      <TabsRoot
        items={items}
        defaultValue="events"
        value={activeTab}
        onValueChange={setActiveTab}
        className="min-h-0 flex-1"
      >
        <TabsHeader className="shrink-0 border-b border-app-border px-2" />
        <TabsContent contentClassName="p-0" />
      </TabsRoot>
    </div>
  );
}

function StreamEventsList({ events }: { events: readonly StreamEvent[] }) {
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
      {events.map((event, index) => (
        <div
          key={`${event.kind}-${event.at}-${index}`}
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
      ))}
    </div>
  );
}

function StreamChatView({
  requestBody,
  assistantText,
  isStreaming,
}: {
  requestBody: string;
  assistantText: string;
  isStreaming: boolean;
}) {
  const userText = requestBody.trim() || '(empty request body)';

  return (
    <div
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-4"
      data-testid={HTTP_REQUEST_TEST_ID.STREAM_CHAT}
    >
      <ChatBubble role="user" text={userText} />
      <ChatBubble
        role="assistant"
        text={assistantText || (isStreaming ? '…' : 'No chat deltas detected in this stream.')}
      />
    </div>
  );
}

function ChatBubble({ role, text }: { role: 'user' | 'assistant'; text: string }) {
  const isUser = role === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words',
          isUser
            ? 'bg-blue-700/40 text-app-text'
            : 'bg-app-bg-base border border-app-border text-app-text',
        )}
      >
        <p className="mb-1 text-[10px] font-medium tracking-wide text-app-text-muted uppercase">
          {isUser ? 'You' : 'Assistant'}
        </p>
        {text}
      </div>
    </div>
  );
}

function formatElapsed(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }

  return `${(ms / 1000).toFixed(1)}s`;
}
