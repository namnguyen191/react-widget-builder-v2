import { Grid, debounce } from '@mui/material';
import { Resizable } from 're-resizable';
import { useState } from 'react';
import CodeEditor from '../../shared/components/CodeEditor';
import { graphQLToString, stringToGraphQL } from '../../shared/utils/format';
import { prettierGraphqlConfig } from '../../shared/utils/prettier-configs';
const GraphQLEditor: React.FC = () => {
  const [graphqlCode, setGraphqlCode] = useState<string>('');
  const [graphqlText, setGraphqlText] = useState<string>('');

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
    async (val: string | undefined): Promise<void> => {
      if (!val) {
        return setGraphqlCode('');
      }

      val = val.trim();
      setGraphqlText(val);

      try {
        const convertedGraphqlCode = stringToGraphQL(val);
        setGraphqlCode(await convertedGraphqlCode);
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
  );
};
export default GraphQLEditor;
