import { cn } from '@maxigarcia/js-utils';
import { resetRequestState } from '@/store/request';
import { useSavedSessionsState } from '@/store/saved-sessions';
import { Button } from '../button';

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
      className={cn('w-full shrink-0', className)}
      onClick={handleClick}
    >
      New session
    </Button>
  );
}
