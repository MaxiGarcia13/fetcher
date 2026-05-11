import { Button } from './button';
import { LinkIcon } from './icons/link';
import { Tooltip } from './tooltip';

export function ShareButton({ className }: { className?: string }) {
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  return (
    <Tooltip content="Share link" position="bottom">
      <Button onClick={handleShare} className={className}>
        <LinkIcon className="size-5" />
      </Button>
    </Tooltip>
  );
}
