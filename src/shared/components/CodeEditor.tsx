import MonacoEditor from '@monaco-editor/react';
import Button from '@mui/material/Button';
import type monaco from 'monaco-editor';
import { Options } from 'prettier';
import * as prettier from 'prettier/standalone';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import styles from './CodeEditor.module.scss';

export type CodeEditorProps = {
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
  prettierConfigOverride?: Options;
  /** Enable the format button. Default is true */
  enableFormat?: boolean;
  /** The theme of the editor. Default is dark  */
  theme?: 'vs-dark' | 'light';
  /** Control whether the editor is readonly. Default is false */
  readonly?: boolean;
};

const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  const {
    initialValue,
    onChange,
    language,
    prettierConfigOverride,
    enableFormat = true,
    theme = 'vs-dark',
    readonly = false
  } = props;

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ): void => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined): void => {
    if (onChange) onChange(value);
  };

  const onFormatClick = async () => {
    const unformatted = editorRef.current?.getValue();

    if (!unformatted) return;

    let formatted = unformatted;

    try {
      formatted = await prettier.format(
        unformatted ?? '',
        prettierConfigOverride ?? {
          parser: 'babel',
          plugins: [parser],
          useTabs: false,
          semi: true,
          singleQuote: true
        }
      );

      formatted.replace(/\n$/, '');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message, {
          autoClose: false
        });
      }
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
          foldingStrategy: 'auto',
          foldingHighlight: true,
          showFoldingControls: 'always',
          folding: true,
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          readOnly: readonly
        }}
      />
    </div>
  );
};
export default CodeEditor;
