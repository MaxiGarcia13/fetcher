import type { TabItem } from '@/components/tabs/types';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useMemo, useState } from 'react';
import { LazyEditor } from '@/components/editor/lazy-editor';
import { TabsContent } from '@/components/tabs/tabs-content';
import { TabsHeader } from '@/components/tabs/tabs-header';
import { TabsRoot } from '@/components/tabs/tabs-root';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { useHttpResponseState } from '@/store/http-response';
import {
  assembleChatFromEvents,
  streamEventToRawText,
} from '@/utils/stream-chat';
import { StreamChatView } from './stream-chat-view';
import { StreamEventsList } from './stream-events-list';
import { StreamStatusBar } from './stream-status-bar';

type StreamTab = 'events' | 'assembled' | 'raw' | 'chat';

interface Props {
  className?: string;
}

export function RequestStreamResponse({ className }: Props) {
  const { body, error, events, isStreaming, streamFormat, streamStatus } = useHttpResponseState();
  const { body: requestBody } = useHttpRequestState();
  const [activeTab, setActiveTab] = useState<StreamTab>('events');
  const showRawTab = streamFormat === 'sse';

  const rawText = useMemo(
    () => (showRawTab ? events.map((event) => streamEventToRawText(event)).join('') : ''),
    [events, showRawTab],
  );
  const chatText = useMemo(() => assembleChatFromEvents(events), [events]);
  const elapsedMs = events.at(-1)?.at ?? 0;

  useEffect(() => {
    if (!showRawTab && activeTab === 'raw') {
      setActiveTab('events');
    }
  }, [activeTab, showRawTab]);

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
    ...(showRawTab
      ? [{
          value: 'raw' as const,
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
        }]
      : []),
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
      <StreamStatusBar
        streamStatus={streamStatus}
        eventCount={events.length}
        elapsedMs={elapsedMs}
        isStreaming={isStreaming}
        requestBody={requestBody}
        assistantText={chatText}
      />

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
