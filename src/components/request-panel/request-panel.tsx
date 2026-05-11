import { cn } from '@maxigarcia/js-utils';
import { ResizablePanel } from '@/components/resizable-panel';
import { RequestOptionsPanel } from './request-options-panel';
import { RequestResponse } from './request-response';

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
      secondContent={<RequestResponse />}
      direction="vertical"
    />
  );
}
