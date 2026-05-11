import { cn } from '@maxigarcia/js-utils';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { sendHttpRequest } from '@/domain/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { saveHttpResponse } from '@/store/http-response';
import { SendIcon } from '../icons/send';
import { RequestMethodSelect } from './request-method-select';

interface Props {
  className?: string;
}

export function RequestEditor({ className }: Props) {
  const { method, url, urlError, setMethod, setUrl } = useHttpRequestState();

  const handleSend = () => {
    sendHttpRequest()
      .then((response) => saveHttpResponse(response));
  };

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
        onClick={handleSend}
      >
        <span className="mt-0.5">Send</span>
        <SendIcon className="size-4" />
      </Button>
    </header>
  );
}
