import type { ComponentProps } from 'react';
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
    <Tooltip content="Generate documentation for this request" position="bottom" className={className}>
      <Button onClick={handleClick} className={className} disabled={!url} size={size}>
        <DocIcon className="size-4" />
      </Button>
    </Tooltip>
  );
}
