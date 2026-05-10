import { editor, typescript } from 'monaco-editor';
import { draculaTheme } from './themes/dracula';
import './worker';

const THEME_NAME = 'dracula';

editor.defineTheme(THEME_NAME, draculaTheme);

editor.setTheme(THEME_NAME);

export const EDITOR_CONSTRUCTION_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  language: 'json',
  theme: THEME_NAME,

  fontFamily: 'Fira Code, monospace',
  fontLigatures: true,
  fontSize: 16,

  tabSize: 2,

  minimap: {
    enabled: false,
  },

  lineNumbers: 'off',
  glyphMargin: false,
  renderWhitespace: 'all',
  bracketPairColorization: {
    enabled: true,
  },

  wordWrap: 'on',
  cursorBlinking: 'expand',

  formatOnPaste: true,

  automaticLayout: true,
  fixedOverflowWidgets: true,
  scrollBeyondLastLine: false,
  roundedSelection: false,

  padding: {
    top: 16,
  },
};

export const RUNJS_RUNTIME_GLOBALS = `
/** Same as \`console.log\`, but output is also sent to the RunJS preview panel (and mirrored to the browser console). */
declare function log(...args: unknown[]): void;
/** Same as \`console.warn\`, but output is also sent to the RunJS preview panel (and mirrored to the browser console). */
declare function warn(...args: unknown[]): void;
/** Same as \`console.error\`, but output is also sent to the RunJS preview panel (and mirrored to the browser console). */
declare function error(...args: unknown[]): void;

interface PerfOptions {
  /** Label printed in perf logs; defaults to \`fn.name\` or \`"anonymous"\`. */
  label?: string;
}

interface ExpectMatcher {
  /** Checks strict equality (\`===\`) and prints a pass/fail message in the preview output. */
  toBe(expected: boolean | number | string | null | undefined): Promise<void>;
  /** Checks deep equality and prints a pass/fail message in the preview output. */
  toEqual(expected: boolean | number | string | null | undefined | object | unknown[]): Promise<void>;
  /** Checks that a received string contains the expected string or matches the expected RegExp. */
  stringMatching(expected: string | RegExp): Promise<void>;
  /** Checks that all expected object keys exist and their values deep-equal the received object. */
  objectContaining(expected: object): Promise<void>;
  /** Checks that every expected item exists in the received array (deep equality). */
  arrayContaining(expected: unknown[]): Promise<void>;
}

/**
 * Runs a function, then logs timing (ms) and approximate JS heap delta (when available).
 * If the function returns a thenable, metrics are reported in a \`finally\` callback after it settles.
 * @returns Whatever \`fn\` returns (including a Promise if \`fn\` is async).
 */
declare function perf<TResult, TArgs extends unknown[] = []>(
  fn: (...args: TArgs) => TResult,
  options?: PerfOptions,
  ...args: TArgs
): TResult;
/**
 * Creates assertion matchers for a value or lazy callback.
 * If a function is provided, it is awaited before running each matcher.
 */
declare function expect<T>(value: T | (() => T | Promise<T>)): ExpectMatcher;
`;

typescript.javascriptDefaults.addExtraLib(RUNJS_RUNTIME_GLOBALS, 'runjs-runtime.d.ts');
