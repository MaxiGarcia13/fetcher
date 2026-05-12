import type { SavedSessionSnapshot } from '@/domain/saved-sessions';
import { cn } from '@maxigarcia/js-utils';
import { useSavedSessionsState } from '@/store/saved-sessions';
import { SavedSessionItem } from './saved-session-item';

export interface SavedSessionListProps {
  className?: string;
  onSessionSelect?: () => void;
}

export function SavedSessionList({
  className,
  onSessionSelect,
}: SavedSessionListProps) {
  const {
    sessions,
    activeSession,
    removeSession,
    refresh,
    selectSession,
  } = useSavedSessionsState();

  const sortedSessions = [...sessions].sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());

  const handleSelectSession = (snapshot: SavedSessionSnapshot) => {
    selectSession(snapshot);
    onSessionSelect?.();
  };

  const handleRemoveSession = (snapshot: SavedSessionSnapshot) => {
    removeSession(snapshot);
    refresh();
  };

  return (
    <ul
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto',
        className,
      )}
    >
      {sortedSessions.length === 0
        ? (
            <li className={cn('text-xs text-gray-500')}>No saved requests yet.</li>
          )
        : (
            sortedSessions.map((session) => (
              <SavedSessionItem
                key={session.id}
                snapshot={session}
                isActive={session.id === activeSession || session.search === window.location.search}
                onSelect={handleSelectSession}
                onRemove={handleRemoveSession}
              />
            ))
          )}
    </ul>
  );
}
