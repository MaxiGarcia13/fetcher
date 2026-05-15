import { useState } from 'react';

export function useField<T>(initialValue: T, isValid?: (value: T) => string | undefined) {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | undefined>(undefined);

  const onChange = (value: T) => {
    setValue(value);

    setError(isValid?.(value));
  };

  return { value, error, onChange, setError };
}
