import { ReactElement } from 'react';
import CodeEditor from '../../shared/components/CodeEditor';
import { debounced } from '../../shared/utils/timing';
import { useAppDispatch, useAppSelector } from '../../storeHooks';
import { editstringifiedJs, selectstringifiedJs } from './transformationSlice';

export const StringifiedJsEditor = (): ReactElement => {
  const stringifiedJs = useAppSelector(selectstringifiedJs);
  const dispatch = useAppDispatch();

  const onStringifyTemplateChange = debounced(
    (val: string | undefined): void => {
      if (!val) {
        return;
      }

      dispatch(editstringifiedJs(val));
    },
    1000
  );

  return (
    <CodeEditor
      enableFormat={false}
      language="text"
      initialValue={stringifiedJs}
      onChange={onStringifyTemplateChange}
    />
  );
};
