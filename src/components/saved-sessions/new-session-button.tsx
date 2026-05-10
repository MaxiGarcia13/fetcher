import { cn } from '@maxigarcia/js-utils';
import { resetRequestState } from '@/store/request';
import { Button } from '../button';
import { useSavedSessions } from './use-saved-sessions';

export interface NewSessionButtonProps {
  className?: string;
  onAfterNewSession?: () => void;
}

export function NewSessionButton({ className, onAfterNewSession }: NewSessionButtonProps) {
  const { appendSession } = useSavedSessions();

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
