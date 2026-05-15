import type { ComponentProps } from 'react';
import { lazy, Suspense } from 'react';
import { SavedSessionPanelSkeleton } from './saved-sessions-panel-skeleton';

const SavedSessionsPanel = lazy(() => import('./saved-sessions-panel').then((m) => ({ default: m.SavedSessionsPanel })));

export function LazySavedSessionsPanel(props: ComponentProps<typeof SavedSessionsPanel>) {
  return (
    <Suspense fallback={<SavedSessionPanelSkeleton className={props.className} />}>
      <SavedSessionsPanel {...props} />
    </Suspense>
  );
}
