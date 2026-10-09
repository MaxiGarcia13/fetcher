import { cn } from '@maxigarcia/js-utils';
import { useEffect, useMemo, useRef } from 'react';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { parseChatMessages } from '@/utils/stream-chat';

interface Props {
  requestBody: string;
  assistantText: string;
  isStreaming: boolean;
}

export function StreamChatView({
  requestBody,
  assistantText,
  isStreaming,
}: Props) {
  const listRef = useRef<HTMLDivElement>(null);

  const history = useMemo(() => parseChatMessages(requestBody), [requestBody]);

  const assistantContent = assistantText
    || (isStreaming ? '…' : 'No chat deltas detected in this stream.');

  const trimmedAssistant = assistantText.trim();
  const liveAlreadyInBody = Boolean(
    trimmedAssistant
    && history?.some(
      (message) =>
        message.role === 'assistant'
        && message.content.trim() === trimmedAssistant,
    ),
  );

  useEffect(() => {
    const node = listRef.current;
    if (!node) {
      return;
    }
    node.scrollTop = node.scrollHeight;
  }, [assistantText, isStreaming, history, liveAlreadyInBody]);

  return (
    <div
      ref={listRef}
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-4"
      data-testid={HTTP_REQUEST_TEST_ID.STREAM_CHAT}
    >
      {history
        ? history.map((message, index) => (
            <ChatBubble
              key={`${message.role}-${index}`}
              role={message.role}
              text={message.content}
            />
          ))
        : (
            <ChatBubble
              role="user"
              text={requestBody.trim() || '(empty request body)'}
            />
          )}
      {!liveAlreadyInBody && (
        <ChatBubble role="assistant" text={assistantContent} />
      )}
    </div>
  );
}

function ChatBubble({ role, text }: { role: string; text: string }) {
  const isUser = role === 'user';
  const isSystem = role === 'system';

  return (
    <div
      className={cn(
        'flex',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words',
          isUser && 'bg-blue-700/40 text-app-text',
          isSystem && 'border border-dashed border-app-border bg-app-bg-base text-app-text-muted',
          !isUser && !isSystem && 'border border-app-border bg-app-bg-base text-app-text',
        )}
      >
        <p className="mb-1 text-[10px] font-medium tracking-wide text-app-text-muted uppercase">
          {roleLabel(role)}
        </p>
        {text}
      </div>
    </div>
  );
}

function roleLabel(role: string): string {
  switch (role) {
    case 'user':
      return 'You';
    case 'assistant':
      return 'Assistant';
    case 'system':
      return 'System';
    default:
      return role;
  }
}
