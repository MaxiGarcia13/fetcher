import type { HttpMethod } from '../../domain/http-method';
import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { RequestMethodSelect } from './request-method-select';

interface Props {
  className?: string;
}

export function RequestEditor({ className }: Props) {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('');

  return (
    <header className={cn('flex gap-2', className)}>
      <div className="flex flex-1">
        <RequestMethodSelect value={method} onChange={setMethod} className="rounded-r-none" />
        <Input
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Enter url"
          aria-label="Request URL"
          className="min-w-0 flex-1 rounded-l-none border-l-0"
        />
      </div>
      <Button variant="primary" className="min-w-24">Send</Button>
    </header>
  );
}
