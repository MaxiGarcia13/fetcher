export type ButtonVariant = 'default' | 'primary' | 'success' | 'transparent';

export type ButtonSize = 'sm' | 'md' | 'lg';

/** Shared Tailwind classes for {@link import('./button').Button} and split-button wrappers. */
export const buttonBaseClassName = 'inline-flex items-center justify-center gap-2 cursor-pointer rounded font-medium outline-none transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-gray-600';

/** Shared Tailwind classes for {@link import('./button').Button} and split-button wrappers. */
export const variantClassName: Record<ButtonVariant, string> = {
  default:
    'border border-gray-600 bg-transparent text-white hover:bg-gray-600 focus-visible:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
  primary:
    'border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
  success:
    'border border-transparent bg-green-600 text-white hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
  transparent:
    'border-0 bg-transparent text-current hover:bg-transparent focus-visible:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
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
