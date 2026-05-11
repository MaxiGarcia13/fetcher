import { cn } from '@maxigarcia/js-utils';
import { useSavedSessionsState } from '@/store/saved-sessions';
import { HistoryButton } from './history-button';
import { NewSessionButton } from './new-session-button';
import { ShareButton } from './share-button';

export interface ActionsSessionProps {
  className?: string;
}

export function ActionsSession({ className }: ActionsSessionProps) {
  const { refresh } = useSavedSessionsState();

  return (
    <div className={cn('flex gap-2', className)}>
      <HistoryButton className="block shrink-0 sm:hidden" />
      <ShareButton className="shrink-0" />
      <NewSessionButton onAfterNewSession={refresh} className="flex-1 shrink-0" />
    </div>
  );
}
