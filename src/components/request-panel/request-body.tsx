import { cn } from '@maxigarcia/js-utils';
import { lazy, Suspense } from 'react';
import { EditorSkeleton } from '@/components/skeleton';
import { useRequestState } from '@/store/request';

const Editor = lazy(() =>
  import('@/components/editor/editor').then((m) => ({ default: m.Editor })),
);

interface Props {
  className?: string;
}

export function RequestBody({ className }: Props) {
  const { body, setBody } = useRequestState();

  return (
    <Suspense
      fallback={
        <EditorSkeleton className={cn('min-h-0 flex-1', className)} />
      }
    >
      <Editor
        className={cn('min-h-0 flex-1', className)}
        value={body}
        onChange={setBody}
      />
    </Suspense>
  );
}
