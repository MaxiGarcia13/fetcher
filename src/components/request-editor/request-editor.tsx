import { cn } from '@maxigarcia/js-utils';

interface Props {
  className?: string;
}

export function RequestEditor({ className }: Props) {
  return (
    <div className={cn('flex gap-4', className)}>
      <h1>Request Editor</h1>
    </div>
  );
}
