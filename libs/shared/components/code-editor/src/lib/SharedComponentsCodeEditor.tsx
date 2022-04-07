import MonacoEditor, { Monaco } from '@monaco-editor/react';
import Button from '@mui/material/Button';
import type monaco from 'monaco-editor';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import styles from './SharedComponentsCodeEditor.module.scss';

export type SharedComponentsCodeEditorProps = {
  /** The initial codes */
  initialValue?: string;
  /**
   * Callback that get execute whenever the code inside the editor change due to
   * user input (so programmatice change won't be detected)
   */
  onChange?: (value: string | undefined) => void;
  /** The language for the editor. Default to javascript */
  language?: string;
  /** Allow overriding prettier config which will affect
   * the "Format" function. By default formatting only works for javascript */
  prettierConfigOverride?: prettier.Options;
  /** Enable the format button. Default is true */
  enableFormat?: boolean;
  /** The theme of the editor. Default is dark  */
  theme?: 'vs-dark' | 'light';
  /** Control whether the editor is readonly. Default is false */
  readonly?: boolean;
};

export const SharedComponentsCodeEditor: React.FC<
  SharedComponentsCodeEditorProps
> = (props) => {
  const {
    initialValue,
    onChange,
    language,
    prettierConfigOverride,
    enableFormat = true,
    theme = 'vs-dark',
    readonly = false,
  } = props;

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

    if (!unformatted) return;

    let formatted = unformatted;

    try {
      formatted = prettier
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
    } catch (err: any) {
      toast.error(err?.message, {
        autoClose: false,
      });
    }

    editorRef.current?.setValue(formatted);
  };

  return (
    <div className={styles['editorWrapper']}>
      {enableFormat && (
        <Button
          className={`${styles['buttonFormat']}`}
          size="small"
          variant="outlined"
          onClick={onFormatClick}
        >
          Format
        </Button>
      )}

      <MonacoEditor
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        value={initialValue}
        theme={theme}
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
          readOnly: readonly,
        }}
      />
    </div>
  );
};
