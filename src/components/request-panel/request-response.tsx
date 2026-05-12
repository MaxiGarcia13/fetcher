import { cn } from '@maxigarcia/js-utils';
import { LazyEditor } from '@/components/editor';
import { EditorSkeleton } from '@/components/skeleton';
import { HTTP_REQUEST_TEST_ID } from '@/constants/tests/http-request';
import { useHttpResponseState } from '@/store/http-response';

interface Props {
  className?: string;
}

export function RequestResponse({ className }: Props) {
  const { body, error, isLoading, status } = useHttpResponseState();

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
      <div
        className={cn('min-h-0 flex-1 flex items-center justify-center bg-gray-800', className)}
        data-testid={HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR}
      >
        <p className={cn(' p-4 text-sm text-gray-400', className)}>
          Send a request to see the response here.
        </p>
      </div>
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
