import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids';
import { submitHttpRequest } from '@/domain/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { saveHttpResponse, saveHttpResponseError, setHttpResponseLoading, useHttpResponseState } from '@/store/http-response';
import { Button } from '../button';
import { SendIcon } from '../icons/send';

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
  );
}
