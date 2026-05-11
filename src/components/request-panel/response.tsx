import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { LazyEditor } from '@/components/editor';

interface Props {
  className?: string;
}

export function Response({ className }: Props) {
  const [body, setBody] = useState('{}');

  return (
    <LazyEditor
      className={cn('min-h-0 flex-1', className)}
      value={body}
      onChange={setBody}
    />
  );
}
