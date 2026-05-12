import { cn } from '@maxigarcia/js-utils';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { HTTP_REQUEST_TEST_ID } from '@/constants/tests/http-request';
import { sendHttpRequest } from '@/domain/http-request';
import { useHttpRequestState } from '@/store/http-request';
import {
  saveHttpResponse,
  saveHttpResponseError,
  setHttpResponseLoading,
  useHttpResponseState,
} from '@/store/http-response';
import { SendIcon } from '../icons/send';
import { RequestMethodSelect } from './request-method-select';

interface Props {
  className?: string;
}

export function RequestEditor({ className }: Props) {
  const { method, url, urlError, setMethod, setUrl } = useHttpRequestState();
  const { isLoading } = useHttpResponseState();

  const handleSend = () => {
    setHttpResponseLoading(true);

    sendHttpRequest()
      .then((response) => saveHttpResponse(response))
      .catch((error) => saveHttpResponseError(error))
      .finally(() => setHttpResponseLoading(false));
  };

  return (
    <header className={cn('flex gap-2', className)}>
      <div className="flex flex-1">
        <RequestMethodSelect
          value={method}
          onChange={setMethod}
          className="rounded-r-none"
          data-testid={HTTP_REQUEST_TEST_ID.METHOD_SELECT}
        />
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
          data-testid={HTTP_REQUEST_TEST_ID.URL_INPUT}
        />
      </div>
      <Button
        variant="primary"
        className="flex min-w-0 shrink-0 items-center gap-2 sm:min-w-24"
        disabled={!url || urlError !== undefined || isLoading}
        onClick={handleSend}
        data-testid={HTTP_REQUEST_TEST_ID.SEND_BUTTON}
      >
        <span className="mt-0.5 hidden sm:block">Send</span>
        <SendIcon className="size-4" />
      </Button>
    </header>
  );
}
