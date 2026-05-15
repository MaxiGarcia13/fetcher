import type { ReactNode } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { LazyEditor } from '@/components/editor';
import { EditorSkeleton } from '@/components/editor/editor-skeleton';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { useHttpResponseState } from '@/store/http-response';
import { errorEditorValueAndLanguage, isImageResponseBody, responseEditorLanguage } from '@/utils/http-response';

interface Props {
  className?: string;
}

export function RequestResponse({ className }: Props) {
  const { body, error, headers, isLoading, status } = useHttpResponseState();

  if (isLoading) {
    return <EditorSkeleton className={cn('min-h-0 flex-1', className)} />;
  }

  if (error) {
    const { value, language } = errorEditorValueAndLanguage(error);
    return (
      <LazyEditor
        className={cn('min-h-0 flex-1', className)}
        value={value}
        language={language}
        data-testid={HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR}
        readOnly
      />
    );
  }

  if (status === null) {
    return (
      <ContentWrapper className={className}>
        <p className={cn(' p-4 text-sm text-app-text-muted', className)}>
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
      language={responseEditorLanguage(headers, body)}
      data-testid={HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR}
      readOnly
    />
  );
}

function ContentWrapper({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn('min-h-0 flex-1 flex items-center justify-center bg-app-bg-surface p-4', className)}
      data-testid={HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR}
    >
      {children}
    </div>
  );
}
