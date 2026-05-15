import { cn } from '@maxigarcia/js-utils';
import { ChevronDownIcon } from './icons/chevron-down';

export interface SelectOption {
  label: string;
  value: NativeSelectProps['value'];
}

type NativeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

interface SelectProps extends Omit<NativeSelectProps, 'onChange'> {
  onChange: (value: NativeSelectProps['value']) => void;
  options: ReadonlyArray<SelectOption>;
  className?: string;
}

export function Select({
  value,
  onChange,
  options,
  className,
  ...props
}: SelectProps) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        className={cn(
          'border border-gray-600 focus:border-gray-600 cursor-pointer',
          'h-10 w-full appearance-none rounded  py-2 pr-9 pl-3 text-sm',
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value.toString()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 size-4 text-gray-600" />
    </div>
  );
}
