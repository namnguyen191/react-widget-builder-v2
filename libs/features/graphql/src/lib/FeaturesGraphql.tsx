import { Grid } from '@mui/material';
import { SharedComponentsCodeEditor } from '@uihub/shared/components/code-editor';
import graphQLParser from 'prettier/parser-graphql';
import { Resizable } from 're-resizable';
import { useState } from 'react';
import { graphQLToString, stringToGraphQL } from './utils/format';

export const FeaturesGraphql: React.FC = () => {
  const [graphqlCode, setGraphqlCode] = useState<string>('');
  const [graphqlText, setGraphqlText] = useState<string>('');

  const prettierGraphqlConfig = {
    parser: 'graphql',
    plugins: [graphQLParser],
  };

  const onGraphqlCodeChange = (val: string | undefined): void => {
    if (!val) {
      return setGraphqlText('');
    }

    val = val.trim();
    setGraphqlCode(val);

    const convertedGraphqlText = graphQLToString(val);
    setGraphqlText(convertedGraphqlText);
  };

  const onGraphqlTextChange = (val: string | undefined): void => {
    if (!val) {
      return setGraphqlCode('');
    }

    val = val.trim();
    setGraphqlText(val);

    const convertedGraphqlCode = stringToGraphQL(val);
    setGraphqlCode(convertedGraphqlCode);
  };

  return (
    <Grid container spacing={2} mt={1}>
      <Resizable
        defaultSize={{
          width: '70vw',
          height: '85vh',
        }}
        style={{ marginRight: '5vw', marginBottom: '2rem' }}
      >
        <SharedComponentsCodeEditor
          language="graphql"
          prettierConfigOverride={prettierGraphqlConfig}
          onChange={onGraphqlCodeChange}
          initialValue={graphqlCode}
        ></SharedComponentsCodeEditor>
      </Resizable>
      <Resizable
        defaultSize={{
          width: '25vw',
          height: '85vh',
        }}
      >
        <SharedComponentsCodeEditor
          language="text"
          enableFormat={false}
          onChange={onGraphqlTextChange}
          initialValue={graphqlText}
        ></SharedComponentsCodeEditor>
      </Resizable>
    </Grid>
  );
};
