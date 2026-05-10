import { cn } from '@maxigarcia/js-utils';
import { resetRequestState } from '@/store/request';
import { useSavedSessionsState } from '@/store/saved-sessions';
import { Button } from '../button';
import { PlusIcon } from '../icons/plus';

export interface NewSessionButtonProps {
  className?: string;
  onAfterNewSession?: () => void;
}

export function NewSessionButton({ className, onAfterNewSession }: NewSessionButtonProps) {
  const { appendSession, setActiveSession } = useSavedSessionsState();

  const handleClick = () => {
    setActiveSession(null);

    appendSession({
      savedAt: new Date().toISOString(),
      search: window.location.search,
      id: crypto.randomUUID(),
    });

    resetRequestState();

    onAfterNewSession?.();
  };

  return (
    <Button
      type="button"
      className={cn('w-full shrink-0 flex items-center gap-2', className)}
      onClick={handleClick}
    >
      <PlusIcon className="size-4" />
      <span className="mt-0.5">
        New session
      </span>
    </Button>
  );
}
