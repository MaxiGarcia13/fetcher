import type { HttpMethod } from '../../domain/http-method';
import { cn, isValidHttpUrl } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { useField } from '../../hooks/use-field';
import { Button } from '../button';
import { Input } from '../input';
import { RequestMethodSelect } from './request-method-select';

interface Props {
  className?: string;
}

export function RequestEditor({ className }: Props) {
  const url = useField('', (value) => isValidHttpUrl(value) ? undefined : 'Invalid URL');
  const [method, setMethod] = useState<HttpMethod>('GET');

  return (
    <header className={cn('flex gap-2', className)}>
      <div className="flex flex-1">
        <RequestMethodSelect value={method} onChange={setMethod} className="rounded-r-none" />
        <Input
          type="url"
          value={url.value}
          onChange={(event) => {
            url.onChange(event.target.value);
          }}
          placeholder="Enter url"
          aria-label="Request URL"
          className="flex-1 rounded-l-none border-l-0"
          error={url.error}
        />
      </div>
      <Button variant="primary" className="min-w-24">Send</Button>
    </header>
  );
}
