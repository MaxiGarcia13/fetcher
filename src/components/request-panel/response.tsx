import { cn } from '@maxigarcia/js-utils';
import { LazyEditor } from '@/components/editor';
import { useHttpResponseState } from '@/store/response';

interface Props {
  className?: string;
}

export function Response({ className }: Props) {
  const { body } = useHttpResponseState();

  return (
    <LazyEditor
      className={cn('min-h-0 flex-1', className)}
      value={body}
      onChange={() => {}}
      readOnly
    />
  );
}
