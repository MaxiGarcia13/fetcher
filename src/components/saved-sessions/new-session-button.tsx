import { cn } from '@maxigarcia/js-utils';
import { resetRequestState } from '@/store/request';
import { useSavedSessionsState } from '@/store/saved-sessions';
import { Button } from '../button';

export interface NewSessionButtonProps {
  className?: string;
  onAfterNewSession?: () => void;
}

export function NewSessionButton({ className, onAfterNewSession }: NewSessionButtonProps) {
  const { appendSession } = useSavedSessionsState();

  const handleClick = () => {
    appendSession({
      savedAt: new Date().toISOString(),
      search: window.location.search,
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
