import type { HttpMethod } from '@/domain/http-request';
import { cn } from '@maxigarcia/js-utils';

export interface RequestMethodBadgeProps {
  method: HttpMethod | null;
  className?: string;
}

function methodTextClass(method: HttpMethod): string {
  switch (method.toUpperCase()) {
    case 'GET':
      return 'text-sky-300';
    case 'POST':
      return 'text-emerald-300';
    case 'PUT':
      return 'text-amber-300';
    case 'PATCH':
      return 'text-orange-300';
    case 'DELETE':
      return 'text-rose-300';
    case 'HEAD':
    case 'OPTIONS':
      return 'text-app-text-muted';
    default:
      return 'text-slate-300';
  }
}

export function RequestMethodBadge({ method, className }: RequestMethodBadgeProps) {
  return (
    <span
      className={cn(
        'shrink-0 font-mono text-xs font-semibold',
        methodTextClass(method),
        className,
      )}
    >
      {method}
    </span>
  );
}
