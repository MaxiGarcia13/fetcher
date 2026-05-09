import { cn } from '@maxigarcia/js-utils';
import { ResizablePanel } from '../resizable-panel';

interface Props {
  className?: string;
}

export function RequestPanel({ className }: Props) {
  return (
    <ResizablePanel
      className={cn('flex-1', className)}
      leftContent={<div>Left</div>}
      rightContent={<div>Right</div>}
      direction="vertical"
    />
  );
}
