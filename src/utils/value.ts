import { removeTrailingCommas, unwrapString } from '@maxigarcia/js-utils';

const NUMERIC_STRING_PATTERN = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;

function isNumericString(value: string): boolean {
  return NUMERIC_STRING_PATTERN.test(value.trim());
}

export function tryParseJson(value: string): unknown | undefined {
  try {
    const fixed = value.replace(
      /([{,]\s*)([a-z_$][\w$]*)(\s*:)/gi,
      '$1"$2"$3',
    );
    const unwrapped = unwrapString(fixed);
    const removedTrailingCommas = removeTrailingCommas(unwrapped);

    return JSON.parse(removedTrailingCommas);
  } catch {
    return undefined;
  }
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
