import { cn } from '@maxigarcia/js-utils';
import { LazyEditor } from '@/components/editor/lazy-editor';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { useHttpRequestState } from '@/store/http-request';

interface Props {
  className?: string;
}

export function RequestBody({ className }: Props) {
  const { body, setBody } = useHttpRequestState();

  return (
    <LazyEditor
      className={cn('min-h-0 flex-1', className)}
      value={body}
      onChange={setBody}
      data-testid={HTTP_REQUEST_TEST_ID.REQUEST_BODY_EDITOR}
    />
  );
}
