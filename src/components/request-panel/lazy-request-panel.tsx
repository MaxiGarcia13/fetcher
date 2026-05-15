import type { ComponentProps } from 'react';
import { lazy, Suspense } from 'react';
import { RequestPanelSkeleton } from './request-panel-skeleton';

const RequestPanel = lazy(() => import('./request-panel').then((m) => ({ default: m.RequestPanel })));

export function LazyRequestPanel(props: ComponentProps<typeof RequestPanel>) {
  return (
    <Suspense fallback={<RequestPanelSkeleton className={props.className} />}>
      <RequestPanel {...props} />
    </Suspense>
  );
}
