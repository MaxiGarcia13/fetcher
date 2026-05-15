import { cn } from '@maxigarcia/js-utils';
import { Input } from '@/components/input';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { RequestMethodSelect } from './request-method-select';
import { SubmitButton } from './submit-button';

interface Props {
  className?: string;
}

export function RequestEditor({ className }: Props) {
  const { method, url, urlError, setMethod, setUrl } = useHttpRequestState();

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
      <SubmitButton />
    </header>
  );
}
