// import styles from './SharedComponentsTextEditor.module.scss';

import MDEditor from '@uiw/react-md-editor';

export type SharedComponentsTextEditorProps = {
  value?: string;
  theme?: 'light' | 'dark';
  onChange?: (val: string | undefined) => void;
};

export const SharedComponentsTextEditor: React.FC<
  SharedComponentsTextEditorProps
> = (props) => {
  const { theme = 'dark', value = '', onChange } = props;

  const handleEditorChange = (val: string | undefined): void => {
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div className="text-editor">
      <MDEditor value={value} onChange={handleEditorChange} />
    </div>
  );
};
