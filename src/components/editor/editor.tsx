import { cn, debounce } from '@maxigarcia/js-utils';
import { editor } from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { EDITOR_CONSTRUCTION_OPTIONS } from './config';
import { ContextMenu } from './context-menu';

interface EditorProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ className, value, onChange }: EditorProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<editor.IStandaloneCodeEditor>(null);

  const focusEditor = () => {
    if (window === window.parent) {
      editorInstanceRef.current?.focus();
    }
  };

  useEffect(() => {
    if (editorContainerRef.current) {
      editorInstanceRef.current = editor.create(
        editorContainerRef.current,
        {
          ...EDITOR_CONSTRUCTION_OPTIONS,
          contextmenu: false,
          value,
        },
      );

      const debouncedOnChange = debounce(onChange, 100);

      editorInstanceRef.current.onDidChangeModelContent(() => {
        const value = editorInstanceRef.current.getValue();
        debouncedOnChange(value);
      });

      focusEditor();

      return () => {
        editorInstanceRef.current?.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (editorInstanceRef.current && value !== editorInstanceRef.current.getValue()) {
      editorInstanceRef.current.setValue(value);
      focusEditor();
    }
  }, [value]);

  return (
    <ContextMenu
      className={cn('relative box-border h-full min-h-0 w-full overflow-hidden', className)}
      editor={editorInstanceRef}
    >
      <div ref={editorContainerRef} className="h-full w-full" />
    </ContextMenu>
  );
}
