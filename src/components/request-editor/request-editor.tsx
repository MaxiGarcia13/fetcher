import { cn } from '@maxigarcia/js-utils';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useRequestState } from '@/store/request';
import { SendIcon } from '../icons/send';
import { RequestMethodSelect } from './request-method-select';

interface Props {
  className?: string;
}

export function RequestEditor({ className }: Props) {
  const { method, url, urlError, setMethod, setUrl } = useRequestState();

  return (
    <header className={cn('flex gap-2', className)}>
      <div className="flex flex-1">
        <RequestMethodSelect value={method} onChange={setMethod} className="rounded-r-none" />
        <Input
          type="url"
          value={url}
          onChange={(event) => {
            setUrl(event.target.value);
          }}
          placeholder="Enter url"
          aria-label="Request URL"
          className="flex-1 rounded-l-none border-l-0"
          error={urlError}
        />
      </div>
      <Button
        variant="primary"
        className="flex min-w-24 items-center gap-2"
        disabled={!url || urlError !== undefined}
      >
        <span className="mt-0.5">Send</span>
        <SendIcon className="size-4" />
      </Button>
    </header>
  );
}
