import { cn } from '@maxigarcia/js-utils';
import { LazyEditor } from '@/components/editor';
import { EditorSkeleton } from '@/components/skeleton';
import { useHttpResponseState } from '@/store/http-response';

interface Props {
  className?: string;
}

export function RequestResponse({ className }: Props) {
  const { body, isLoading } = useHttpResponseState();

  if (isLoading) {
    return <EditorSkeleton className={cn('min-h-0 flex-1', className)} />;
  }

  return (
    <LazyEditor
      className={cn('min-h-0 flex-1', className)}
      value={body}
      readOnly
    />
  );
}
