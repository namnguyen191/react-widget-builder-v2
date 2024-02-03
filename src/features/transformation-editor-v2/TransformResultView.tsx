import * as prettier from 'prettier/standalone';
import { ReactElement, useEffect, useState } from 'react';
import CodeEditor from '../../shared/components/CodeEditor';
import { prettierJsonConfig } from '../../shared/utils/prettier-configs';

import { useAppSelector } from '../../storeHooks';
import { selectTransformationResult } from './transformationSlice';

export const TransformResultView = (): ReactElement => {
  const transformationResult = useAppSelector(selectTransformationResult);
  const [prettifiedTransformationResult, setPrettifiedTransformationResult] =
    useState<string>('{}');

  useEffect(() => {
    console.warn('Generating new prettified transformation result');
    const prettifyTransformationResult = async () => {
      try {
        const result = await prettier.format(
          transformationResult,
          prettierJsonConfig
        );
        setPrettifiedTransformationResult(result);
      } catch (error) {
        // most likely transformation result is not in json format
        console.warn('Error prettifying transformation result', error);
        setPrettifiedTransformationResult(transformationResult);
      }
    };
    prettifyTransformationResult();
  }, [transformationResult]);

  return (
    <CodeEditor
      initialValue={prettifiedTransformationResult}
      prettierConfigOverride={prettierJsonConfig}
      language="json"
      readonly={true}
    />
  );
};
