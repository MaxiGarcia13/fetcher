import { useHttpRequestState } from '@/store/http-request';
import { Button } from './button';
import { DocIcon } from './icons/doc';
import { Tooltip } from './tooltip';

export function DocButton({ className }: { className?: string }) {
  const { url } = useHttpRequestState();

  const handleClick = () => {
    window.location.href = `/doc${window.location.search}`;
  };

  return (
    <Tooltip content="Documentation" position="bottom" className={className}>
      <Button onClick={handleClick} className={className} disabled={!url}>
        <DocIcon className="size-4" />
      </Button>
    </Tooltip>
  );
}
