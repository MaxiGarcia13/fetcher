import type { ComponentProps } from 'react';
import { lazy, Suspense } from 'react';
import { RequestEditorSkeleton } from './request-editor-skeleton';

const RequestEditor = lazy(() => import('./request-editor').then((m) => ({ default: m.RequestEditor })));

export function LazyRequestEditor(props: ComponentProps<typeof RequestEditor>) {
  return (
    <Suspense fallback={<RequestEditorSkeleton className={props.className} />}>
      <RequestEditor {...props} />
    </Suspense>
  );
}
