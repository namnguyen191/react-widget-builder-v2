import { Grid } from '@mui/material';
import { SharedComponentsCodeEditor } from '@uihub/shared/components/code-editor';
import graphQLParser from 'prettier/parser-graphql';
import { Resizable } from 're-resizable';

export const FeaturesGraphql: React.FC = () => {
  const prettierGraphqlConfig = {
    parser: 'graphql',
    plugins: [graphQLParser],
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
          prettierConfigOverride={prettierGraphqlConfig}
          enableFormat={false}
        ></SharedComponentsCodeEditor>
      </Resizable>
    </Grid>
  );
};
