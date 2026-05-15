import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids';
import { submitHttpRequest } from '@/domain/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { saveHttpResponse, saveHttpResponseError, setHttpResponseLoading, useHttpResponseState } from '@/store/http-response';
import { DropdownButton } from '../button';
import { SendIcon } from '../icons/send';
import { Tooltip } from '../tooltip';

export function SubmitButton() {
  const { url, urlError } = useHttpRequestState();
  const { isLoading } = useHttpResponseState();

  const handleSend = () => {
    setHttpResponseLoading(true);

    submitHttpRequest()
      .then((response) => saveHttpResponse(response))
      .catch((error) => saveHttpResponseError(error))
      .finally(() => setHttpResponseLoading(false));
  };

  return (
    <DropdownButton
      variant="primary"
      className="min-w-0 shrink-0 sm:min-w-32"
      disabled={!url || urlError !== undefined || isLoading}
      data-testid={HTTP_REQUEST_TEST_ID.SEND_BUTTON}
      menuItems={
        [
          {
            label: (
              <>
                <SendIcon className="size-4" />
                <span className="mt-0.5">Submit the request from the server</span>
              </>
            ),
            onClick: handleSend,
            children: (
              <Tooltip content="Submit the request from the server" className="flex items-center gap-2">
                <span className="mt-0.5 hidden sm:block">Send</span>
                <SendIcon className="size-4" />
              </Tooltip>
            ),
          },
          {
            label: (
              <>
                <SendIcon className="size-4" />
                <span className="mt-0.5">Submit the request from the client</span>
              </>
            ),
            onClick: handleSend,
            children: (
              <Tooltip content="Submit the request from the client" className="flex items-center gap-2">
                <span className="mt-0.5 hidden sm:block">Send</span>
                <SendIcon className="size-4" />
              </Tooltip>
            ),
          },
        ]
      }
    />
  );
}
