import { DiffEditor as MonacoDiffEditor } from '@monaco-editor/react';
import { ReactElement } from 'react';

export type DiffEditorProps = {
  original: string;
  modified: string;
  language?: 'js' | 'graphql' | 'text';
};

export const DiffEditor = (props: DiffEditorProps): ReactElement => {
  const { original, modified, language = 'text' } = props;

  return (
    <MonacoDiffEditor
      width="100%"
      height="100%"
      original={original}
      modified={modified}
      language={language}
      theme="dark"
      options={{
        readOnly: true
      }}
    />
  );
};
