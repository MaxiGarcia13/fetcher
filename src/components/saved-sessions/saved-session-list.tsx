import type { SavedSessionSnapshot } from '@/domain/saved-sessions';
import { cn } from '@maxigarcia/js-utils';
import { SavedSessionItem } from './saved-session-item';

export interface SavedSessionListProps {
  sessions: SavedSessionSnapshot[];
  activeSessionId?: string | null;
  className?: string;
  emptyClassName?: string;
  onSelectSession?: (snapshot: SavedSessionSnapshot) => void;
  onRemoveSession?: (snapshot: SavedSessionSnapshot) => void;
}

export function SavedSessionList({
  sessions,
  activeSessionId,
  className,
  emptyClassName,
  onSelectSession,
  onRemoveSession,
}: SavedSessionListProps) {
  const ordered = [...sessions].reverse();

  return (
    <ul
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto',
        className,
      )}
    >
      {ordered.length === 0
        ? (
            <li className={cn('text-xs text-gray-500', emptyClassName)}>No saved sessions yet.</li>
          )
        : (
            ordered.map((session) => (
              <SavedSessionItem
                key={session.id}
                snapshot={session}
                isActive={session.id === activeSessionId || session.search === window.location.search}
                onSelect={onSelectSession}
                onRemove={onRemoveSession}
              />
            ))
          )}
    </ul>
  );
}
