import { cn } from '@maxigarcia/js-utils';
import { ResizablePanel } from '../resizable-panel';
import { RequestOptionsPanel } from './request-options-panel';
import { Response } from './response';

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
      secondContent={<Response />}
      direction="vertical"
    />
  );
}
