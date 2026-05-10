import type { editor } from 'monaco-editor';
import { KeyCode, KeyMod } from 'monaco-editor';
import { useEffect } from 'react';
import { CommandIcon } from '../../icons/command';
import { PasteIcon } from '../../icons/paste';
import { ContextMenuItem } from './context-menu-item';

interface PasteActionMenuItemProps {
  editor: editor.IStandaloneCodeEditor;
  onActionClick: () => void;
}

export function PasteActionMenuItem({ editor, onActionClick }: PasteActionMenuItemProps) {
  const runPasteAction = async () => {
    onActionClick();
    const pasteAction = editor?.getAction('customPaste');
    await pasteAction?.run();
    editor.focus();
  };

  useEffect(() => {
    editor.addAction({
      id: 'customPaste',
      label: 'Paste',
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyV],
      run: async () => {
        const model = editor?.getModel();
        const position = editor?.getPosition();

        if (!editor || !model || !position) {
          return;
        }

        const clipboardData = await navigator.clipboard.readText();

        editor.executeEdits('paste', [{
          range: {
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: 1,
          },
          text: clipboardData,
        }]);
      },
    });
  }, []);

  return (
    <ContextMenuItem
      onClick={runPasteAction}
      icon={<PasteIcon className="size-4" />}
      command={<CommandIcon className="size-4" combination="V" />}
    >
      Paste
    </ContextMenuItem>
  );
}
