import { cn } from '@maxigarcia/js-utils';
import { useSavedSessionsState } from '@/store/saved-sessions';
import { DocButton } from './doc-button';
import { HistoryButton } from './history-button';
import { NewSessionButton } from './new-session-button';
import { ShareButton } from './share-button';

export interface ActionsSessionProps {
  className?: string;
}

export function ActionsSession({ className }: ActionsSessionProps) {
  const { refresh } = useSavedSessionsState();

  return (
    <div className={cn('flex gap-2 w-full', className)}>
      <DocButton className="flex-1" />
      <HistoryButton className="block flex-1 sm:hidden" />
      <ShareButton className="flex-1" />
      <NewSessionButton onAfterNewSession={refresh} className="flex-1" />
    </div>
  );
}
