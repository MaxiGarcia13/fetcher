import type { ReactNode } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { LazyEditor } from '@/components/editor';
import { EditorSkeleton } from '@/components/skeleton';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { useHttpResponseState } from '@/store/http-response';

interface Props {
  className?: string;
}

function isImageResponseBody(headers: Record<string, string>, body: string): boolean {
  const contentType = (headers['content-type'] ?? '').split(';')[0]?.trim().toLowerCase() ?? '';
  if (contentType.startsWith('image/')) {
    return true;
  }
  return body.startsWith('data:image/');
}

export function RequestResponse({ className }: Props) {
  const { body, error, headers, isLoading, status } = useHttpResponseState();

  if (isLoading) {
    return <EditorSkeleton className={cn('min-h-0 flex-1', className)} />;
  }

  if (error) {
    return (
      <LazyEditor
        className={cn('min-h-0 flex-1', className)}
        value={JSON.stringify(error, null, 2)}
        data-testid={HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR}
        readOnly
      />
    );
  }

  if (status === null) {
    return (
      <ContentWrapper className={className}>
        <p className={cn(' p-4 text-sm text-gray-400', className)}>
          Send a request to see the response here.
        </p>
      </ContentWrapper>
    );
  }

  if (isImageResponseBody(headers, body)) {
    return (
      <ContentWrapper className={className}>
        <img
          src={body}
          alt="Response body"
          className="max-h-full max-w-full object-contain"
        />
      </ContentWrapper>
    );
  }

  return (
    <LazyEditor
      className={cn('min-h-0 flex-1', className)}
      value={body}
      data-testid={HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR}
      readOnly
    />
  );
}

function ContentWrapper({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn('min-h-0 flex-1 flex items-center justify-center bg-gray-800 p-4', className)}
      data-testid={HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR}
    >
      {children}
    </div>
  );
}
