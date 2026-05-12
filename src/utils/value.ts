const NUMERIC_STRING_PATTERN = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;

function isNumericString(value: string): boolean {
  return NUMERIC_STRING_PATTERN.test(value.trim());
}

export function tryParseJson(value: string): unknown | undefined {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

export function normalizeJsonObjectValue(value: unknown): unknown {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();

  if (trimmed === '') {
    return value;
  }

  const parsed = tryParseJson(trimmed);

  if (parsed !== undefined && parsed !== null && typeof parsed === 'object') {
    return parsed;
  }

  return value;
}

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

    if (trimmed === '') {
      return 'null';
    }

    if (trimmed === 'undefined') {
      return 'undefined';
    }

    const parsed = tryParseJson(trimmed);

    if (parsed !== undefined) {
      if (typeof parsed === 'string') {
        return 'string';
      }

      return getValueType(parsed);
    }

    return isNumericString(trimmed) ? 'number' : 'string';
  }

  return typeof value;
}

export function formatExampleValue(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
}
