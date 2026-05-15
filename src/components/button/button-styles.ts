export type ButtonVariant = 'default' | 'primary' | 'success' | 'transparent' | 'secondary';

export type ButtonSize = 'sm' | 'md' | 'lg';

/** Disabled appearance for buttons (`disabled:`) and split-button wrappers (applied when `disabled` is true). */
export const disabledButtonClassName
  = 'cursor-not-allowed bg-app-bg-surface border-transparent hover:bg-app-bg-surface focus-visible:ring-0';

/** Shared Tailwind classes for {@link import('./button').Button} and split-button wrappers. */
export const buttonBaseClassName = `inline-flex items-center justify-center cursor-pointer rounded font-medium outline-none transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-app-bg-surface disabled:border-transparent disabled:hover:bg-app-bg-surface disabled:focus-visible:ring-0`;

/** Shared Tailwind classes for {@link import('./button').Button} and split-button wrappers. */
export const variantClassName: Record<ButtonVariant, string> = {
  default:
    'border border-gray-600 bg-transparent text-app-text hover:bg-app-bg-hover focus-visible:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg-base',
  primary:
    'border border-transparent bg-blue-600 text-app-text hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg-base',
  success:
    'border border-transparent bg-green-600 text-app-text hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg-base',
  transparent:
    'border-0 bg-none text-current hover:bg-none focus-visible:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg-base',
  secondary:
    'border border-transparent bg-sky-600 text-app-text hover:bg-sky-700 focus-visible:border-sky-600 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg-base',
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
