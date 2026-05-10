import type { HttpMethod } from '@/domain/http-method';
import { cn } from '@maxigarcia/js-utils';

export interface RequestMethodBadgeProps {
  method: HttpMethod | null;
  className?: string;
}

function methodTextClass(method: HttpMethod): string {
  switch (method.toUpperCase()) {
    case 'GET':
      return 'text-sky-400';
    case 'POST':
      return 'text-emerald-400';
    case 'PUT':
      return 'text-amber-400';
    case 'PATCH':
      return 'text-orange-400';
    case 'DELETE':
      return 'text-rose-400';
    case 'HEAD':
    case 'OPTIONS':
      return 'text-gray-400';
    default:
      return 'text-slate-400';
  }
}

export function RequestMethodBadge({ method, className }: RequestMethodBadgeProps) {
  const label = method?.trim() ? method.trim() : 'GET';

  return (
    <span
      className={cn(
        'shrink-0 font-mono text-[11px] font-semibold',
        methodTextClass(label as HttpMethod),
        className,
      )}
    >
      {label}
    </span>
  );
}
