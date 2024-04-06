import DifferenceIcon from '@mui/icons-material/Difference';

import { Fab, Grid, debounce } from '@mui/material';
import { Resizable } from 're-resizable';
import { useState } from 'react';
import CodeEditor from '../../shared/components/CodeEditor';
import { DiffEditor } from '../../shared/components/DiffEditor';
import { graphQLToString, stringToGraphQL } from '../../shared/utils/format';
import { prettierGraphqlConfig } from '../../shared/utils/prettier-configs';
import styles from './GraphQLEditor.module.scss';
const GraphQLEditor: React.FC = () => {
  const [graphqlCode, setGraphqlCode] = useState<string>('');
  const [graphqlText, setGraphqlText] = useState<string>('');
  const [isDiffEditorOpen, setIsDiffEditorOpen] = useState<boolean>(false);
  const [graphqlDiffTextOriginal, setGraphqlDiffTextOriginal] =
    useState<string>('');
  const [graphqlDiffTextModified, setGraphqlDiffTextModified] =
    useState<string>('');

  const onGraphqlCodeChange = debounce((val: string | undefined): void => {
    if (!val) {
      return setGraphqlText('');
    }

    setGraphqlCode(val);
    // trim after setting graphql code to avoid cursor jumping
    val = val.trim();
    const convertedGraphqlText = graphQLToString(val);
    setGraphqlText(convertedGraphqlText);
  }, 500);

  const onGraphqlTextChange = debounce(
    async (
      val: string | undefined,
      diff?: 'original' | 'modified'
    ): Promise<void> => {
      if (!val) {
        return setGraphqlCode('');
      }

      val = val.trim();

      if (!diff) {
        setGraphqlText(val);
      }

      try {
        const convertedGraphqlCode = await stringToGraphQL(val);
        if (!diff) {
          setGraphqlCode(convertedGraphqlCode);
          return;
        }

        if (diff === 'original') {
          setGraphqlDiffTextOriginal(convertedGraphqlCode);
          return;
        }

        if (diff === 'modified') {
          setGraphqlDiffTextModified(convertedGraphqlCode);
          return;
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(
            'Fail to create Graphql code from raw string due to invalid fomart: ',
            err.message
          );
        }
      }
    },
    500
  );

  return (
    <div className={styles['container']}>
      <Fab
        onClick={() =>
          setIsDiffEditorOpen((prev) => {
            if (prev) {
              // Remove existing text
              setGraphqlDiffTextOriginal('');
              setGraphqlDiffTextModified('');
            }
            return !prev;
          })
        }
        className={styles['compare_button']}
        variant="extended"
      >
        <DifferenceIcon sx={{ mr: 1 }} />
        Compare
      </Fab>
      {isDiffEditorOpen && (
        <div className={styles['diff_container']}>
          <div className={styles['diff_editor']}>
            <DiffEditor
              original={graphqlDiffTextOriginal}
              modified={graphqlDiffTextModified}
              language="graphql"
            />
          </div>
          <div className={styles['diff_inputs']}>
            <CodeEditor
              onChange={(val) => onGraphqlTextChange(val, 'original')}
              language="text"
              enableFormat={false}
            ></CodeEditor>
            <CodeEditor
              onChange={(val) => onGraphqlTextChange(val, 'modified')}
              language="text"
              enableFormat={false}
            ></CodeEditor>
          </div>
        </div>
      )}
      <Grid container spacing={2} mt={1}>
        <Resizable
          defaultSize={{
            width: '70vw',
            height: '85vh'
          }}
          style={{ marginRight: '5vw', marginBottom: '2rem' }}
        >
          <CodeEditor
            language="graphql"
            prettierConfigOverride={prettierGraphqlConfig}
            onChange={onGraphqlCodeChange}
            initialValue={graphqlCode}
          ></CodeEditor>
        </Resizable>
        <Resizable
          defaultSize={{
            width: '25vw',
            height: '85vh'
          }}
        >
          <CodeEditor
            language="text"
            enableFormat={false}
            onChange={onGraphqlTextChange}
            initialValue={graphqlText}
          ></CodeEditor>
        </Resizable>
      </Grid>
    </div>
  );
};
export default GraphQLEditor;
