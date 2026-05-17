export function getValueType(value: unknown): string {
  if (value === null) {
    return 'null';
  }

  if (value === undefined) {
    return 'undefined';
  }

  if (Array.isArray(value)) {
    return 'array';
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    return Number.isNaN(+trimmed) ? 'string' : 'number';
  }

  return typeof value;
}

export function getExampleValue(value: unknown): string {
  if (value === null) {
    return 'null';
  }

  if (value === undefined) {
    return 'undefined';
  }

  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }

  return String(value);
}
