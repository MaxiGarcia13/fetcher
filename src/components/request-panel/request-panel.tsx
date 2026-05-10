import { cn } from '@maxigarcia/js-utils';
import { ResizablePanel } from '../resizable-panel';
import { RequestPanelLeft } from './request-panel-left';

interface Props {
  className?: string;
}

export function RequestPanel({ className }: Props) {
  return (
    <ResizablePanel
      className={cn('flex-1', className)}
      leftContent={
        <RequestPanelLeft />
      }
      rightContent={<div>Right</div>}
      direction="vertical"
    />
  );
}
