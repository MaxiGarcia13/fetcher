import { cn } from '@maxigarcia/js-utils';
import { lazy, Suspense } from 'react';
import { EditorSkeleton } from '@/components/skeleton';

const Editor = lazy(() =>
  import('./editor').then((m) => ({ default: m.Editor })),
);

interface LazyEditorProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export function LazyEditor({ className, value, onChange }: LazyEditorProps) {
  return (
    <Suspense
      fallback={<EditorSkeleton className={cn('min-h-0 flex-1', className)} />}
    >
      <Editor
        className={cn('min-h-0 flex-1', className)}
        value={value}
        onChange={onChange}
      />
    </Suspense>
  );
}
