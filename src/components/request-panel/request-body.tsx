import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { Editor } from '../editor/editor';

interface Props {
  className?: string;
}

export function RequestBody({ className }: Props) {
  const [body, setBody] = useState('{}');

  return (
    <Editor
      className={cn('min-h-0 flex-1', className)}
      value={body}
      onChange={setBody}
    />
  );
}
