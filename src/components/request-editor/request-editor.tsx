import { cn } from '@maxigarcia/js-utils';
import { Input } from '@/components/input';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { RequestMethodSelect } from './request-method-select';
import { ResponseModeControls } from './response-mode-controls';
import { SubmitButton } from './submit-button';

interface Props {
  className?: string;
}

export function RequestEditor({ className }: Props) {
  const { method, url, urlError, setMethod, setUrl } = useHttpRequestState();

  return (
    <header className={cn('flex flex-col gap-2 sm:flex-row sm:items-start', className)}>
      <div className="flex w-full min-w-0 flex-1">
        <RequestMethodSelect
          value={method}
          onChange={setMethod}
          className="max-w-20 rounded-r-none sm:max-w-none"
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
          className="min-w-0 flex-1 rounded-none border-l-0"
          error={urlError}
          data-testid={HTTP_REQUEST_TEST_ID.URL_INPUT}
        />
        <ResponseModeControls />
      </div>

      <SubmitButton />
    </header>
  );
}
