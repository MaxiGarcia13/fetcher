import type { HttpMethod } from './request-method-select';
import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { RequestMethodSelect } from './request-method-select';

interface Props {
  className?: string;
}

export function RequestEditor({ className }: Props) {
  const [method, setMethod] = useState<HttpMethod>('GET');

  return (
    <div className={cn('flex gap-4', className)}>
      <RequestMethodSelect value={method} onChange={setMethod} />
    </div>
  );
}
