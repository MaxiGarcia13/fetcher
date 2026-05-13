import type { ComponentProps } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { SAVED_SESSIONS_TEST_ID } from '@/constants/test-ids';
import { resetHttpRequestState, useHttpRequestState } from '@/store/http-request';
import { useSavedSessionsState } from '@/store/saved-sessions';
import { Button } from './button';
import { PlusIcon } from './icons/plus';
import { Tooltip } from './tooltip';

export interface NewSessionButtonProps extends ComponentProps<typeof Button> {
  className?: string;
  onAfterNewSession?: () => void;
}

export function NewSessionButton({ className, onAfterNewSession, size }: NewSessionButtonProps) {
  const { appendSession, setActiveSession } = useSavedSessionsState();
  const { url } = useHttpRequestState();

  const handleClick = () => {
    setActiveSession(null);

    appendSession({
      savedAt: new Date().toISOString(),
      search: window.location.search,
      id: crypto.randomUUID(),
    });

    resetHttpRequestState();

    onAfterNewSession?.();
  };

  return (
    <Tooltip content="New request" position="bottom" className={className}>
      <Button
        type="button"
        className={cn('shrink-0 flex items-center gap-2', className)}
        onClick={handleClick}
        disabled={!url}
        data-testid={SAVED_SESSIONS_TEST_ID.NEW_SESSION_BUTTON}
        size={size}
      >
        <PlusIcon className="size-4 shrink-0" />
      </Button>
    </Tooltip>
  );
}
