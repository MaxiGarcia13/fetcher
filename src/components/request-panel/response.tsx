import { cn } from '@maxigarcia/js-utils';
import { lazy, Suspense, useState } from 'react';
import { EditorSkeleton } from '@/components/skeleton';

const Editor = lazy(() =>
  import('@/components/editor/editor').then((m) => ({ default: m.Editor })),
);

interface Props {
  className?: string;
}

export function Response({ className }: Props) {
  const [body, setBody] = useState('{}');

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
