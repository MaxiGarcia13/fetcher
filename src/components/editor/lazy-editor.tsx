import type { ComponentProps } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { lazy, Suspense } from 'react';
import { EditorSkeleton } from './editor-skeleton';

const Editor = lazy(() =>
  import('./editor').then((m) => ({ default: m.Editor })),
);

type LazyEditorProps = ComponentProps<typeof Editor>;

export function LazyEditor(props: LazyEditorProps) {
  return (
    <Suspense
      fallback={<EditorSkeleton className={cn('min-h-0 flex-1', props.className)} />}
    >
      <Editor {...props} />
    </Suspense>
  );
}
