import { cn } from '@maxigarcia/js-utils';
import { LazyEditor } from '@/components/editor';
import { useRequestState } from '@/store/request';

interface Props {
  className?: string;
}

export function RequestBody({ className }: Props) {
  const { body, setBody } = useRequestState();

  return (
    <LazyEditor
      className={cn('min-h-0 flex-1', className)}
      value={body}
      onChange={setBody}
    />
  );
}
