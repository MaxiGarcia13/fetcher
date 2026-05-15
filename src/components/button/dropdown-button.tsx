import type { ComponentProps, ReactNode } from 'react';
import type { ButtonVariant } from './button-styles';
import { cn } from '@maxigarcia/js-utils';
import { useId, useRef, useState } from 'react';
import { Menu, MenuItem } from '@/components/menu';
import { storage } from '@/utils/storage';
import { ChevronDownIcon } from '../icons/chevron-down';
import { Button } from './button';
import { buttonBaseClassName, splitButtonOuterHeightClassName, variantClassName } from './button-styles';

interface DropdownButtonMenuItem
  extends Omit<ComponentProps<typeof MenuItem>, 'children' | 'onClick'> {
  id?: string;
  label: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
}

interface DropdownButtonProps extends Omit<ComponentProps<typeof Button>, 'children' | 'onClick'> {
  menuItems: readonly DropdownButtonMenuItem[];
  defaultSelectedItemIndex?: number;
}

const borderSeparatorClassNames: Record<ButtonVariant, string> = {
  default: 'border-l border-gray-500',
  primary: 'border-l border-blue-500',
  success: 'border-l border-green-500',
  transparent: 'border-l border-gray-500',
  secondary: 'border-l border-sky-400',
};

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

  const STORAGE_KEY = `fetcher.dropdown-button-selected-index-${menuId}`;

  const [selectedIndex, setSelectedIndex] = useState(() => {
    const storedIndex = storage.read(STORAGE_KEY);

    return storedIndex ? Number.parseInt(storedIndex) : defaultSelectedItemIndex;
  });

  const selectedItem = menuItems[selectedIndex] ?? menuItems[defaultSelectedItemIndex];

  const closeMenu = () => setOpen(false);

  const handleToggleMenu = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen((previous) => !previous);
    event.stopPropagation();
  };

  if (!selectedItem) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      role="button"
      className={cn(
        buttonBaseClassName,
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
        className={cn('h-full rounded rounded-l-none border-l', borderSeparatorClassNames[variant])}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleToggleMenu(event);
          }
        }}
        onClick={handleToggleMenu}
      >
        <ChevronDownIcon
          className={cn('size-4 text-current transition-transform', open && 'rotate-180')}
        />
      </Button>

      {open && (
        <Menu
          id={menuId}
          anchorRef={containerRef}
          onClose={closeMenu}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.id ?? index}
              disabled={item.disabled}
              onClick={() => {
                item.onClick?.();
                closeMenu();
                setSelectedIndex(index);
                storage.write(STORAGE_KEY, index.toString());
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
}
