import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { Button } from './button';
import { HistoryIcon } from './icons/history';
import { Modal } from './modal';
import { SavedSessionList } from './saved-sessions/saved-session-list';

export interface HistoryButtonProps {
  className?: string;
}

export function HistoryButton({ className }: HistoryButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className={cn(className)} onClick={() => setOpen(true)}>
        <HistoryIcon className="size-4" />
      </Button>
      <Modal
        title="Saved requests"
        open={open}
        onClose={() => setOpen(false)}
      >
        <SavedSessionList />
      </Modal>
    </>
  );
}
