import type { HttpMethod } from '../../domain/http-method';
import type { SelectOption } from '../select';
import { HTTP_METHODS } from '../../domain/http-method';
import { Select } from '../select';

const HTTP_METHOD_OPTIONS: ReadonlyArray<SelectOption> = HTTP_METHODS.map((method) => ({
  label: method,
  value: method,
}));

interface RequestMethodSelectProps {
  value: HttpMethod;
  onChange: (method: HttpMethod) => void;
  className?: string;
}

export function RequestMethodSelect({ value, onChange, className }: RequestMethodSelectProps) {
  return (
    <Select
      value={value}
      onChange={onChange}
      options={HTTP_METHOD_OPTIONS}
      aria-label="HTTP method"
      className={className}
    />
  );
}
