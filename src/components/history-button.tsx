import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { Button } from './button';
import { HistoryIcon } from './icons/history';
import { Modal } from './modal';
import { SavedSessionList } from './saved-sessions/saved-session-list';
import { Tooltip } from './tooltip';

export interface HistoryButtonProps {
  className?: string;
}

export function HistoryButton({ className }: HistoryButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip content="Saved requests" position="bottom" className={className}>
        <Button className={cn(className)} onClick={() => setOpen(true)}>
          <HistoryIcon className="size-4" />
        </Button>
      </Tooltip>
      <Modal
        title="Saved requests"
        open={open}
        onClose={() => setOpen(false)}
      >
        <SavedSessionList onSessionSelect={() => setOpen(false)} />
      </Modal>
    </>
  );
}
