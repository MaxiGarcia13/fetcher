import { cn } from '@maxigarcia/js-utils';
import { useSavedSessionsState } from '@/store/saved-sessions';
import { CopyJsFetchButton } from './copy-js-fetch-button';
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
      <CopyJsFetchButton className="flex-1" size="sm" />
      <DocButton className="flex-1" size="sm" />
      <HistoryButton className="block flex-1 sm:hidden" size="sm" />
      <ShareButton className="flex-1" size="sm" />
      <NewSessionButton onAfterNewSession={refresh} className="flex-1" size="sm" />
    </div>
  );
}
