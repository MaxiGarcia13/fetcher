import { cn } from '@maxigarcia/js-utils';

interface ContextMenuItemProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  command?: React.ReactNode;
}

export function ContextMenuItem({ onClick, children, icon, command }: ContextMenuItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        'flex w-full cursor-pointer items-center gap-2 p-2',
        'text-left text-sm text-inherit',
        'hover:bg-gray-600 transition-colors',
      )}
      onClick={onClick}
    >
      {
        icon && (
          <span className="shrink-0">
            {icon}
          </span>
        )
      }
      <span className="mt-1 flex-1">
        {children}
      </span>
      {
        command && (
          <span className="mt-1 shrink-0">
            {command}
          </span>
        )
      }
    </button>
  );
}
