import type { ComponentProps } from 'react';
import type { SelectOption } from '@/components/select';
import type { HttpMethod } from '@/domain/http-request';
import { Select } from '@/components/select';
import { HTTP_METHODS } from '@/domain/http-request';

const HTTP_METHOD_OPTIONS: ReadonlyArray<SelectOption> = HTTP_METHODS.map((method) => ({
  label: method,
  value: method,
}));

interface RequestMethodSelectProps
  extends Omit<ComponentProps<typeof Select>, 'value' | 'onChange' | 'options'> {
  value: HttpMethod;
  onChange: (method: HttpMethod) => void;
}

export function RequestMethodSelect({ value, onChange, ...props }: RequestMethodSelectProps) {
  return (
    <Select
      {...props}
      value={value}
      onChange={onChange}
      options={HTTP_METHOD_OPTIONS}
      aria-label="HTTP method"
    />
  );
}
