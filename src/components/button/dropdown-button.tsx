import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDownIcon } from '../icons/chevron-down';
import { Button } from './button';
import { splitButtonOuterHeightClassName, variantClassName } from './button-styles';

interface DropdownButtonMenuItem {
  id?: string;
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
}

interface DropdownButtonProps extends Omit<ComponentProps<typeof Button>, 'children' | 'onClick'> {
  menuItems: readonly DropdownButtonMenuItem[];
  defaultSelectedItemIndex?: number;
}

export function DropdownButton({
  menuItems,
  className,
  disabled,
  variant = 'default',
  size = 'md',
  defaultSelectedItemIndex = 0,
  ...rest
}: DropdownButtonProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedItemIndex);
  const selectedItem = menuItems[selectedIndex];

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (!selectedItem) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      role="button"
      className={cn(
        'relative inline-flex rounded',
        splitButtonOuterHeightClassName[size],
        variantClassName[variant],
        className,
      )}
    >
      <Button
        type="button"
        variant="transparent"
        size={size}
        disabled={disabled}
        className="h-full shrink-0 rounded rounded-r-none"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selectedItem.onClick?.();
          }
        }}
        onClick={() => {
          selectedItem?.onClick?.();
        }}
        {...rest}
      >
        <span className="flex shrink-0 items-center">{selectedItem.children}</span>
      </Button>
      <Button
        type="button"
        variant="transparent"
        size={size}
        disabled={disabled}
        className="h-full rounded rounded-l-none border-l border-gray-500"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setOpen((previous) => !previous);
            event.stopPropagation();
          }
        }}
        onClick={() => {
          setOpen((previous) => !previous);
        }}
      >
        <ChevronDownIcon
          className={cn('size-4 text-current transition-transform', open && 'rotate-180')}
        />
      </Button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute top-full right-0 z-50 mt-1 min-w-40 rounded-md border border-gray-700 bg-gray-800 py-2 shadow-xl"
        >
          {menuItems.map((item, index) => (
            <MenuRow
              key={item.id ?? index}
              item={item}
              onClose={() => {
                setOpen(false);
                setSelectedIndex(index);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MenuRow({
  item,
  onClose,
}: {
  item: DropdownButtonMenuItem;
  onClose: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={item.disabled}
      className={cn(
        'flex w-full cursor-pointer items-center gap-2 p-2 text-left text-sm text-inherit transition-colors hover:bg-gray-600',
        'disabled:cursor-not-allowed disabled:opacity-50',
      )}
      onClick={() => {
        if (item.disabled) {
          return;
        }
        item.onClick?.();
        onClose();
      }}
    >
      <span className="flex flex-1 items-center gap-2">{item.label}</span>
    </button>
  );
}
