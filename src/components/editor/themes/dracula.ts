import type { editor } from 'monaco-editor';

export const draculaTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    {
      background: '282a36',
      token: '',
    },
    {
      foreground: '6272a4',
      token: 'comment',
    },
    {
      foreground: 'f1fa8c',
      token: 'string',
    },
    {
      foreground: 'bd93f9',
      token: 'constant',
    },
    {
      foreground: '8be9fd',
      token: 'number',
    },
    {
      foreground: '8be9fd',
      token: 'constant.numeric',
    },
    {
      foreground: 'ff79c6',
      token: 'keyword',
    },
    {
      foreground: 'ff79c6',
      token: 'storage',
    },
    {
      foreground: '8be9fd',
      token: 'storage.type',
    },
    {
      foreground: '50fa7b',
      token: 'entity.name.class',
    },
    {
      foreground: '50fa7b',
      token: 'entity.other.inherited-class',
    },
    {
      foreground: 'ff0000',
      token: 'entity.name.function',
    },
    {
      foreground: 'ff0000',
      token: 'function',
    },
    {
      foreground: 'ff0000',
      token: 'identifier.function',
    },
    {
      foreground: 'ff0000',
      token: 'variable.function',
    },
    {
      foreground: 'ff79c6',
      token: 'entity.name.tag',
    },
    {
      foreground: '50fa7b',
      token: 'entity.other.attribute-name',
    },
    {
      foreground: '50fa7b',
      token: 'support.function',
    },
    {
      foreground: 'f8f8f2',
      token: 'variable',
    },
    {
      foreground: '6be5fd',
      token: 'support.constant',
    },
    {
      foreground: '66d9ef',
      token: 'support.type',
    },
    {
      foreground: '66d9ef',
      token: 'support.class',
    },
    {
      foreground: 'f8f8f0',
      background: 'ff79c6',
      token: 'invalid',
    },
    {
      foreground: 'f8f8f0',
      background: 'bd93f9',
      token: 'invalid.deprecated',
    },
    {
      foreground: 'f83333',
      token: 'message.error',
    },
  ],
  colors: {
    'editor.foreground': '#F8F8F2',
    'editor.background': '#1F2937',
    'editor.selectionBackground': '#44475A',
    'editor.lineHighlightBackground': '#44475A',
    'editorCursor.foreground': '#F8F8F2',
    'editorWhitespace.foreground': '#404040',
  },
};
