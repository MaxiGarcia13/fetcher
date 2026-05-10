import type { SavedSessionSnapshot } from '@/domain/saved-sessions';
import { cn } from '@maxigarcia/js-utils';
import {
  applyRequestFromSearch,
} from '@/store/request';
import { useSavedSessionsState } from '@/store/saved-sessions';
import { NewSessionButton } from './new-session-button';
import { SavedSessionList } from './saved-session-list';

export interface SavedSessionsPanelProps {
  className?: string;
}

export function SavedSessionsPanel({ className }: SavedSessionsPanelProps) {
  const { sessions, removeSession, refresh } = useSavedSessionsState();

  const handleSelectSession = (snapshot: SavedSessionSnapshot) => {
    applyRequestFromSearch(snapshot.search);
    refresh();
  };

  const handleRemoveSession = (snapshot: SavedSessionSnapshot) => {
    removeSession(snapshot);
    refresh();
  };

  return (
    <div className={cn('flex min-h-0 flex-1 flex-col gap-4 pt-4', className)}>
      <NewSessionButton onAfterNewSession={refresh} />

      <h2 className="shrink-0 text-sm font-medium text-gray-400 uppercase">
        Saved sessions
      </h2>

      <SavedSessionList
        sessions={sessions}
        onSelectSession={handleSelectSession}
        onRemoveSession={handleRemoveSession}
      />

    </div>
  );
}
