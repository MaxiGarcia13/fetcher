import { cn } from '@maxigarcia/js-utils';
import { SavedSessionList } from './saved-session-list';
import { SavedSessionsTitle } from './saved-sessions-title';

export interface SavedSessionsPanelProps {
  className?: string;
}

export function SavedSessionsPanel({ className }: SavedSessionsPanelProps) {
  return (
    <div className={cn('flex min-h-0 flex-1 flex-col gap-4', className)}>
      <SavedSessionsTitle />

      <SavedSessionList />
    </div>
  );
}
