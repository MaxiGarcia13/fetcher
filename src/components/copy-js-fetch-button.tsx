import type { ComponentProps, ReactNode } from 'react';
import { useState } from 'react';
import { METHODS_WITH_BODY, parseObjectFromKeyValueEntries } from '@/domain/http-request';
import { useHttpRequestState } from '@/store/http-request';
import { Button } from './button';
import { CheckIcon } from './icons/check';
import { JsIcon } from './icons/js';
import { Tooltip } from './tooltip';

interface CopyJsFetchButtonProps extends ComponentProps<typeof Button> {
  className?: string;
}

interface CopyJsFetchButtonData {
  tooltip: string;
  variant: ComponentProps<typeof Button>['variant'];
  icon: ReactNode;
}

export function CopyJsFetchButton({ className, ...props }: CopyJsFetchButtonProps) {
  const { url, method, headers, body, params } = useHttpRequestState();

  const [isCopied, setIsCopied] = useState(false);

  const data: CopyJsFetchButtonData = !isCopied
    ? {
        tooltip: 'Copy this request as JavaScript Fetch to the clipboard.',
        variant: 'default',
        icon: <JsIcon className="size-4" />,
      }
    : {
        tooltip: 'Copied',
        variant: 'success',
        icon: <CheckIcon className="size-4" />,
      };

  const handleCopy = () => {
    setIsCopied(true);
    try {
      const paramsObject = parseObjectFromKeyValueEntries(params);
      const decodedParams = new URLSearchParams(paramsObject);
      const decodedUrl = new URL(url);
      const options = {
        method,
        headers: parseObjectFromKeyValueEntries(headers),
        ...(METHODS_WITH_BODY.includes(method) ? { body } : {}),
      };
      if (decodedParams.size > 0) {
        decodedUrl.search = decodedParams.toString();
      }

      navigator.clipboard.writeText(
        `fetch('${decodedUrl}', 
${JSON.stringify(options, null, 2)})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));`,
      );

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  };

  return (
    <Tooltip
      content={data.tooltip}
      position="bottom"
      className={className}
    >
      <Button variant={data.variant} className={className} {...props} onClick={handleCopy}>
        {data.icon}
      </Button>
    </Tooltip>
  );
}
