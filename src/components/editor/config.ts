import { editor } from 'monaco-editor';
import { draculaTheme } from './themes/dracula';
import './worker';

const THEME_NAME = 'dracula';

editor.defineTheme(THEME_NAME, draculaTheme);

editor.setTheme(THEME_NAME);

export const EDITOR_CONSTRUCTION_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
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
