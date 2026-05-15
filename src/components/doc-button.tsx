import type { ComponentProps } from 'react';
import { isValidHttpUrl } from '@maxigarcia/js-utils';
import { useHttpRequestState } from '@/store/http-request';
import { Button } from './button';
import { DocIcon } from './icons/doc';
import { Tooltip } from './tooltip';

type DocButtonProps = ComponentProps<typeof Button>;

export function DocButton({ className, size }: DocButtonProps) {
  const { url } = useHttpRequestState();

  const handleClick = () => {
    window.location.href = `/doc${window.location.search}`;
  };

  return (
    <Tooltip content="Generate documentation for this request" placement="bottom" className={className}>
      <Button
        aria-label="Open request documentation"
        onClick={handleClick}
        className={className}
        disabled={!isValidHttpUrl(url)}
        size={size}
      >
        <DocIcon className="size-4" />
      </Button>
    </Tooltip>
  );
}
