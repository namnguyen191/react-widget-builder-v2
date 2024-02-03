import { ReactElement, useEffect, useState } from 'react';
import CodeEditor from '../../shared/components/CodeEditor';
import { prettierJSConfig } from '../../shared/utils/prettier-configs';
import { debounced } from '../../shared/utils/timing';
import { useAppDispatch, useAppSelector } from '../../storeHooks';
import { editJs, selectData, selectJs } from './transformationSlice';

export const JavaScriptEditor = (): ReactElement => {
  const js = useAppSelector(selectJs);
  const data = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const [autoComplete, setAutoComplete] = useState<{
    language: string;
    data: string;
  }>({ language: 'javascript', data: '' });

  useEffect(() => {
    console.warn('Generating new auto complete');
    const generateJSAutoComplete = () => {
      const parsedData = JSON.parse(data);
      let generatedJS = '';
      for (const [key, val] of Object.entries(parsedData)) {
        generatedJS += `this.${key} = ${JSON.stringify(val)};`;
      }
      return {
        language: 'javascript',
        data: generatedJS
      };
    };
    setAutoComplete(generateJSAutoComplete());
  }, [data]);

  const onJSChange = debounced((val: string | undefined) => {
    if (!val) {
      return;
    }
    dispatch(editJs(val));
  }, 1000);

  return (
    <CodeEditor
      initialValue={js}
      prettierConfigOverride={prettierJSConfig}
      onChange={onJSChange}
      addToAutoComplete={autoComplete}
    />
  );
};
