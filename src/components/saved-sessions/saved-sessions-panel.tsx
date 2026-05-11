import { cn } from '@maxigarcia/js-utils';
import { useSavedSessionsState } from '@/store/saved-sessions';
import { HistoryIcon } from '../icons/history';
import { ShareButton } from '../share-button';
import { NewSessionButton } from './new-session-button';
import { SavedSessionList } from './saved-session-list';

export interface SavedSessionsPanelProps {
  className?: string;
}

export function SavedSessionsPanel({ className }: SavedSessionsPanelProps) {
  const { refresh } = useSavedSessionsState();

  return (
    <div className={cn('flex min-h-0 flex-1 flex-col gap-4 pt-4', className)}>
      <div className="flex gap-2">
        <ShareButton className="shrink-0" />
        <NewSessionButton onAfterNewSession={refresh} className="flex-1 shrink-0" />
      </div>

      <h2 className="flex shrink-0 items-center gap-2 text-sm font-medium text-gray-400 uppercase">
        <HistoryIcon className="size-4" />
        <span className="mt-0.5">
          Saved requests
        </span>
      </h2>

      <SavedSessionList />
    </div>
  );
}
