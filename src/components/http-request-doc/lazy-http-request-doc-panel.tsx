import { lazy, Suspense } from 'react';
import { HttpRequestDocPanelSkeleton } from './http-request-doc-panel-skeleton';

const HttpRequestDocPanel = lazy(() => import('./http-request-doc-panel').then((m) => ({ default: m.HttpRequestDocPanel })));

export function LazyHttpRequestDocPanel(props) {
  return (
    <Suspense fallback={<HttpRequestDocPanelSkeleton {...props} />}>
      <HttpRequestDocPanel {...props} />
    </Suspense>
  );
}
