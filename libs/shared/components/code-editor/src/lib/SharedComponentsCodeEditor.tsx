import MonacoEditor, { Monaco } from '@monaco-editor/react';
import Button from '@mui/material/Button';
import type monaco from 'monaco-editor';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import styles from './SharedComponentsCodeEditor.module.scss';

export type SharedComponentsCodeEditorProps = {
  initialValue?: string;
  onChange?: (value: string | undefined) => void;
  /** The language for the editor. Default to javascript */
  language?: string;
  /** Allow overriding prettier config which will affect
   * the "Format" function. By default formatting only works for javascript */
  prettierConfigOverride?: prettier.Options;
};

export const SharedComponentsCodeEditor: React.FC<
  SharedComponentsCodeEditorProps
> = (props) => {
  const { initialValue, onChange, language, prettierConfigOverride } = props;

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ): void => {
    editorRef.current = editor;
  };

  const handleEditorChange = (
    value: string | undefined,
    event: monaco.editor.IModelContentChangedEvent
  ): void => {
    if (onChange) onChange(value);
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current?.getValue();

    const formatted = prettier
      .format(
        unformatted ?? '',
        prettierConfigOverride ?? {
          parser: 'babel',
          plugins: [parser],
          useTabs: false,
          semi: true,
          singleQuote: true,
        }
      )
      .replace(/\n$/, '');

    editorRef.current?.setValue(formatted);
  };

  return (
    <div className={styles['editorWrapper']}>
      <Button
        className={`${styles['buttonFormat']}`}
        size="small"
        variant="outlined"
        onClick={onFormatClick}
      >
        Format
      </Button>

      <MonacoEditor
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        value={initialValue}
        theme="vs-dark"
        language={language ?? 'javascript'}
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};
