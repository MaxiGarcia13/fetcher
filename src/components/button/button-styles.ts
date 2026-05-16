export type ButtonVariant = 'default' | 'primary' | 'success' | 'transparent' | 'secondary';

export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Split-button wrapper when `disabled` (a `div`, so never `:disabled` in CSS — omit {@link variantClassName} and use this instead).
 */
export const disabledButtonClassName
  = 'cursor-not-allowed border border-transparent bg-app-bg-surface text-app-text';

/** Shared Tailwind classes for {@link import('./button').Button} and split-button wrappers. */
export const buttonBaseClassName = 'inline-flex items-center justify-center cursor-pointer rounded font-medium transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-app-bg-surface disabled:border-transparent disabled:hover:bg-app-bg-surface';

/** Shared Tailwind classes for {@link import('./button').Button} and split-button wrappers. */
export const variantClassName: Record<ButtonVariant, string> = {
  default:
    'border border-gray-600 bg-transparent text-app-text enabled:hover:bg-app-bg-hover',
  primary:
    'border border-transparent bg-blue-600 text-app-text enabled:hover:bg-blue-700',
  success:
    'border border-transparent bg-green-600 text-app-text enabled:hover:bg-green-700',
  transparent:
    'border-0 bg-none text-current enabled:hover:bg-none',
  secondary:
    'border border-transparent bg-sky-600 text-app-text enabled:hover:bg-sky-700',
};
/** Fixed outer height for split controls so a bordered wrapper matches {@link import('./button').Button} box sizing. */
export const sizeClassName: Record<ButtonSize, string> = {
  sm: 'h-8 px-2 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-4 text-base',
};

/** Fixed outer height for split controls so a bordered wrapper matches {@link import('./button').Button} box sizing. */
export const splitButtonOuterHeightClassName: Record<ButtonSize, string> = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
};
