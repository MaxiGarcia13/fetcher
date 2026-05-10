import { cn } from '@maxigarcia/js-utils';
import { ResizablePanel } from '../resizable-panel';
import { RequestOptionsPanel } from './request-options-panel';

interface Props {
  className?: string;
}

export function RequestPanel({ className }: Props) {
  return (
    <ResizablePanel
      className={cn('flex-1', className)}
      firstContent={
        <RequestOptionsPanel />
      }
      secondContent={<div>Right</div>}
      direction="vertical"
    />
  );
}
