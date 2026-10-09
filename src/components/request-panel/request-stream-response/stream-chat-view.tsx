import { cn } from '@maxigarcia/js-utils';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';

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
